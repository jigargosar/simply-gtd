# Anatomy of the preview `view` function

A line-by-line teardown of the **current** view in `src/preview-v001/main.ts`, and how it
connects to the rest of the file. Scope is this one function only. Nothing about the board.

## The whole function

```ts
export const view = (model: Model): Document => {
  const h = html<Message>()

  return {
    title: 'simply-gtd | preview v001',
    body: h.div(
      [h.Class('min-h-screen bg-white flex items-center justify-center p-6')],
      [
        Button.view<Message>({
          onClick: ClickedGreeting(),
          toView: attributes =>
            h.button(
              [
                ...attributes.button,
                h.Class(
                  'text-2xl font-semibold text-gray-900 hover:text-blue-600 transition',
                ),
              ],
              [model.greeting],
            ),
        }),
      ],
    ),
  }
}
```

## What a view IS

A view is a pure function from `Model` to HTML. The user never sees the Model. They see what
`view` renders from it. Given the same Model, it always produces the same HTML. It never mutates
state. It only describes markup and, through event attributes, the Messages to send back into the
loop.

Source: `repos/foldkit/packages/website/src/page/core/view.ts` (docs page "View"). Key line:
"The view function turns your Model into HTML... Given the same Model, view always produces the
same HTML. It never modifies state directly."

## Line by line

### 1. `export const view = (model: Model): Document => {`

- Takes the current `Model` (here `{ greeting: string }`).
- Returns a `Document`, not raw HTML. A `Document` is the top-level page shape:
  ```ts
  type Document = Readonly<{
    title: string
    canonical?: string
    ogUrl?: string
    body: Html
  }>
  ```
  Source: `repos/foldkit/packages/foldkit/src/html/index.ts:136`.
- `export` matters: `entry.ts` imports `view` and hands it to the runtime. `main.ts` never boots
  anything itself, so it stays importable from tests.

### 2. `const h = html<Message>()`

- `html` is a factory. Calling it returns a record of element builders (`h.div`, `h.button`),
  attribute builders (`h.Class`, `h.OnClick`), and helpers (`h.empty`, `h.keyed`).
- The `<Message>` type parameter ties every event attribute to **your** Message union. If you tried
  `h.OnClick(somethingThatIsNotAMessage)`, TypeScript would reject it at compile time.
- Convention: bind `h` **inside** each view function, never at module scope. Each view binds its own
  `h` against the Message type it dispatches.

Source: same docs page, section "Typed HTML Helpers": "Bind the factory once per module by calling
`html<Message>()`, then reach for `h.div`, `h.OnClick`, and the rest off the returned record."

### 3. The returned object: `{ title, body }`

- `title` sets the document title. The runtime writes it to the page `<title>`.
- `body` is the actual element tree. Everything visible lives here.

### 4. `h.div([attributes], [children])`

Every element builder takes two arrays:

1. **Attributes** array, first. Classes, event handlers, aria, etc.
2. **Children** array, second. Text strings or nested elements.

So `h.div([h.Class('...')], [ ...one child... ])` is: a `div` with one class attribute and one
child. This two-array shape is the single rule for all of `h.*`.

### 5. `h.Class('min-h-screen bg-white flex items-center justify-center p-6')`

- An attribute builder. Produces a `class="..."` attribute.
- Plain Tailwind utility classes. These center the single child on a full-height white page.
- Note: these are stock Tailwind classes, not the mock's custom tokens (`bg-page`, `accent`).
  Those tokens are not wired into the real Tailwind v4 build yet, so the preview uses stock classes.

### 6. `Button.view<Message>({ ... })`

This is the one piece that comes from `@foldkit/ui` rather than the raw `html` factory.

- `Button.view` is a **stateless render helper**. It does not own any Model or update. It just
  computes the correct button attributes (type, tabindex, click handler, disabled/aria wiring) and
  asks **you** to render the actual element.
- Signature:
  ```ts
  view: <ParentMessage>(config: ViewConfig<ParentMessage>) => Html
  ```
  Source: `repos/foldkit/packages/ui/src/button/index.ts:23`.
- `ViewConfig` fields (all optional except `toView`):
  ```ts
  type ViewConfig<ParentMessage> = Readonly<{
    toView: (attributes: ButtonAttributes<ParentMessage>) => Html
    onClick?: ParentMessage
    isDisabled?: boolean
    type?: 'button' | 'submit' | 'reset'
    isAutofocus?: boolean
  }>
  ```
  Source: `repos/foldkit/packages/ui/src/button/index.ts:14`.

### 7. `onClick: ClickedGreeting()`

- The **fact** to emit when the button is clicked. Note the `()`: `ClickedGreeting` is a message
  constructor, and calling it builds the message value.
- This is the link from view back into the loop. Internally `Button.view` turns this into an
  `h.OnClick(onClick)` attribute (and skips it when `isDisabled`).
  Source: `repos/foldkit/packages/ui/src/button/index.ts:40-41`.
- You are passing a Message, not a callback. The view describes _what fact to send_, not _what to do_.
  `update` decides the consequence.

### 8. `toView: attributes => h.button([...attributes.button, h.Class(...)], [model.greeting])`

This is the contract that makes `Button` stateless and unopinionated about looks:

- `Button.view` builds the behavior/accessibility attributes and passes them to your `toView` as
  `attributes.button` (a `ReadonlyArray<Attribute>`).
  - `ButtonAttributes = Readonly<{ button: ReadonlyArray<Attribute<ParentMessage>> }>`.
    Source: `repos/foldkit/packages/ui/src/button/index.ts:9`.
  - What is inside that array for us: `h.Type('button')`, `h.Tabindex(0)`, and `h.OnClick(ClickedGreeting())`.
    Source: `repos/foldkit/packages/ui/src/button/index.ts:45-51`.
- You spread those with `...attributes.button`, then add your own styling (`h.Class(...)`).
- The child is `[model.greeting]`: the button's visible text comes straight from the Model field.
  This is the only place the Model touches the view.

Division of labor: Button owns _wiring and a11y_, you own _markup and styling_. That is the whole
point of a "stateless render helper". This exact pattern is shown in the docs button demo
(`repos/foldkit/packages/website/src/page/ui/button.ts:37-44`).

## How it connects to the rest of `main.ts`

- `model.greeting` (line 8 above) reads the **Model** defined as `S.Struct({ greeting: S.String })`.
- `ClickedGreeting()` is the **Message** defined with `m('ClickedGreeting')`.
- When clicked, the runtime sends `ClickedGreeting` to **update**, which returns a new Model with the
  greeting flipped. The runtime then calls `view` again with that new Model, and `[model.greeting]`
  now renders the new text. That is the full loop: view emits a fact, update makes new state, view
  re-renders.
- `view` is exported and consumed in `entry.ts` via `Runtime.makeApplication({ ..., view, container })`,
  which mounts `body` into `#root`.

## One sentence to keep

`view` is a pure `Model -> Document`: it reads Model fields into markup and wires event attributes to
Messages, and it never runs effects or mutates state. Everything effectful happens elsewhere.

## Sources

- View concept and typed helpers: `repos/foldkit/packages/website/src/page/core/view.ts`
- `Document` type: `repos/foldkit/packages/foldkit/src/html/index.ts:136`
- `html` factory exports: `repos/foldkit/packages/foldkit/src/html/public.ts`
- `Button.view`, `ViewConfig`, `ButtonAttributes`: `repos/foldkit/packages/ui/src/button/index.ts`
- Button usage example: `repos/foldkit/packages/website/src/page/ui/button.ts`
