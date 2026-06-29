import { Array, Match as M, Schema as S } from 'effect'
import { Command, Runtime } from 'foldkit'
import { Document, Html, html } from 'foldkit/html'
import { m } from 'foldkit/message'
import { evo } from 'foldkit/struct'

import { Button } from '@foldkit/ui'

// MODEL

const Item = S.Struct({
  id: S.String,
  text: S.String,
  done: S.Boolean,
})
type Item = typeof Item.Type

const Section = S.Struct({
  id: S.String,
  title: S.String,
  collapsed: S.Boolean,
  items: S.Array(Item),
})
type Section = typeof Section.Type

const Filter = S.Literals(['Open', 'Done', 'All'])
type Filter = typeof Filter.Type

export const Model = S.Struct({
  sections: S.Array(Section),
  filter: Filter,
})
export type Model = typeof Model.Type

// MESSAGE

export const SelectedFilter = m('SelectedFilter', { filter: Filter })
export const ToggledSectionCollapse = m('ToggledSectionCollapse', {
  id: S.String,
})

export const Message = S.Union([SelectedFilter, ToggledSectionCollapse])
export type Message = typeof Message.Type

// INIT

const item = (id: string, text: string, done: boolean): Item => ({
  id,
  text,
  done,
})

const section = (
  id: string,
  title: string,
  collapsed: boolean,
  items: ReadonlyArray<Item>,
): Section => ({ id, title, collapsed, items })

const seedSections: ReadonlyArray<Section> = [
  section('inbox', 'Inbox', false, [
    item('inbox-1', 'Reply to the venue about the June booking', false),
    item(
      'inbox-2',
      'Draft the Q3 plan — sections for hiring, budget, and the two product bets; share with the team before Friday',
      false,
    ),
    item('inbox-3', 'Renew the domain', true),
    item('inbox-4', 'Skim the new onboarding doc', false),
  ]),
  section('week', 'This Week', false, [
    item('week-1', 'Book the team offsite', false),
    item('week-2', 'Send the invoice to Acme', true),
    item('week-3', 'Confirm the catering headcount', true),
  ]),
  section('projects', 'Projects', false, [
    item('projects-1', 'Wire up persistence (localStorage one-blob)', false),
    item('projects-2', 'Fractional-index ordering for drag', false),
    item('projects-3', 'Pick the icon set', true),
  ]),
  section('waiting', 'Waiting For', false, [
    item('waiting-1', 'Landlord — reply about the lease renewal', false),
    item('waiting-2', 'Design feedback from Priya', false),
  ]),
  section('someday', 'Someday / Maybe', true, [
    item('someday-1', 'Learn to sail', false),
    item('someday-2', 'Repaint the study', false),
    item('someday-3', 'Read the Effect docs end to end', false),
    item('someday-4', 'Try the new ramen place', true),
    item('someday-5', 'Digitise the old photos', false),
  ]),
  section('reading', 'Reading List', false, [
    item('reading-1', 'Thinking in Systems — finish part 2', false),
    item('reading-2', 'The Pragmatic Programmer', true),
    item('reading-3', 'A Philosophy of Software Design', false),
  ]),
  section('groceries', 'Groceries', false, [
    item('groceries-1', 'Olive oil', false),
    item('groceries-2', 'Coffee beans', false),
    item('groceries-3', 'Eggs', true),
  ]),
  section('errands', 'Errands', false, []),
]

export const init: Runtime.ApplicationInit<Model, Message> = () => [
  { sections: seedSections, filter: 'Open' },
  [],
]

// UPDATE

const withUpdateReturn =
  M.withReturnType<readonly [Model, ReadonlyArray<Command.Command<Message>>]>()

const toggleCollapse = (id: string) => (sections: ReadonlyArray<Section>) =>
  Array.map(sections, current =>
    current.id === id
      ? evo(current, { collapsed: collapsed => !collapsed })
      : current,
  )

export const update = (
  model: Model,
  message: Message,
): readonly [Model, ReadonlyArray<Command.Command<Message>>] =>
  M.value(message).pipe(
    withUpdateReturn,
    M.tagsExhaustive({
      SelectedFilter: ({ filter }) => [
        evo(model, { filter: () => filter }),
        [],
      ],
      ToggledSectionCollapse: ({ id }) => [
        evo(model, { sections: toggleCollapse(id) }),
        [],
      ],
    }),
  )

// ICON

const strokeSvg = (className: string, paths: ReadonlyArray<Html>): Html => {
  const h = html<Message>()

  return h.svg(
    [
      h.AriaHidden(true),
      h.Class(className),
      h.Xmlns('http://www.w3.org/2000/svg'),
      h.Fill('none'),
      h.ViewBox('0 0 24 24'),
      h.StrokeWidth('2'),
      h.Stroke('currentColor'),
      h.StrokeLinecap('round'),
      h.StrokeLinejoin('round'),
    ],
    paths,
  )
}

const checkIcon = (className: string): Html => {
  const h = html<Message>()

  return strokeSvg(className, [h.path([h.D('M20 6 9 17l-5-5')], [])])
}

const chevronIcon = (className: string, collapsed: boolean): Html => {
  const h = html<Message>()

  return strokeSvg(className, [
    h.path([h.D(collapsed ? 'm9 18 6-6-6-6' : 'm6 9 6 6 6-6')], []),
  ])
}

const plusIcon = (className: string): Html => {
  const h = html<Message>()

  return strokeSvg(className, [
    h.path([h.D('M5 12h14')], []),
    h.path([h.D('M12 5v14')], []),
  ])
}

// VIEW

const matchesFilter = (filter: Filter, item: Item): boolean =>
  M.value(filter).pipe(
    M.when('Open', () => !item.done),
    M.when('Done', () => item.done),
    M.when('All', () => true),
    M.exhaustive,
  )

const checkboxView = (done: boolean): Html => {
  const h = html<Message>()

  return h.span(
    [
      h.Class(
        done
          ? 'mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 border-blue-600 bg-blue-600 text-white'
          : 'mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 border-gray-300',
      ),
    ],
    done ? [checkIcon('h-3.5 w-3.5')] : [],
  )
}

const itemView = (item: Item): Html => {
  const h = html<Message>()

  return h.keyed('li')(
    item.id,
    [h.Class('flex items-start gap-2.5 rounded-lg px-2 py-2 hover:bg-gray-50')],
    [
      checkboxView(item.done),
      h.span(
        [
          h.Class(
            `min-w-0 flex-1 break-words text-sm leading-snug ${
              item.done ? 'text-gray-400 line-through' : 'text-gray-800'
            }`,
          ),
        ],
        [item.text],
      ),
    ],
  )
}

const chevronButtonView = (sectionId: string, collapsed: boolean): Html => {
  const h = html<Message>()

  return Button.view<Message>({
    onClick: ToggledSectionCollapse({ id: sectionId }),
    toView: attributes =>
      h.button(
        [
          ...attributes.button,
          h.AriaLabel(collapsed ? 'Expand section' : 'Collapse section'),
          h.Class(
            'grid h-6 w-6 shrink-0 place-items-center rounded-md text-gray-500 hover:bg-gray-100',
          ),
        ],
        [chevronIcon('h-4 w-4', collapsed)],
      ),
  })
}

const sectionHeaderView = (section: Section, visibleCount: number): Html => {
  const h = html<Message>()

  return h.div(
    [h.Class('flex items-center gap-2 px-3 py-2.5')],
    [
      chevronButtonView(section.id, section.collapsed),
      h.span(
        [h.Class('flex-1 truncate text-sm font-semibold text-gray-900')],
        [section.title],
      ),
      h.span(
        [h.Class('text-xs font-medium text-gray-500')],
        [`${visibleCount}`],
      ),
    ],
  )
}

const addButtonView = (): Html => {
  const h = html<Message>()

  return h.div(
    [h.Class('flex justify-end px-3 pb-2.5')],
    [
      h.span(
        [
          h.Class(
            'inline-flex items-center gap-1.5 rounded-md px-1.5 py-1 text-sm font-medium text-blue-700',
          ),
        ],
        [plusIcon('h-4 w-4'), 'add'],
      ),
    ],
  )
}

const filteredFooterView = (filteredCount: number): Html => {
  const h = html<Message>()

  return filteredCount > 0
    ? h.div(
        [h.Class('px-3 pb-1 pt-0 text-xs text-gray-500')],
        [`${filteredCount} filtered`],
      )
    : h.empty
}

const hairlineView = (): Html => {
  const h = html<Message>()

  return h.div([h.Class('h-px bg-gray-200')], [])
}

const itemListView = (items: ReadonlyArray<Item>): Html => {
  const h = html<Message>()

  return h.ul([h.Class('flex flex-col p-1.5')], Array.map(items, itemView))
}

const sectionBodyView = (
  visibleItems: ReadonlyArray<Item>,
  filteredCount: number,
): Html => {
  const h = html<Message>()

  return Array.match(visibleItems, {
    onEmpty: () =>
      filteredCount > 0
        ? h.div([], [hairlineView(), filteredFooterView(filteredCount)])
        : h.empty,
    onNonEmpty: items =>
      h.div(
        [],
        [
          hairlineView(),
          itemListView(items),
          filteredFooterView(filteredCount),
        ],
      ),
  })
}

const collapsedSectionView = (section: Section, visibleCount: number): Html => {
  const h = html<Message>()

  return h.keyed('section')(
    section.id,
    [h.Class('rounded-xl border border-gray-200 bg-white shadow-sm')],
    [sectionHeaderView(section, visibleCount)],
  )
}

const expandedSectionView = (
  section: Section,
  visible: ReadonlyArray<Item>,
  filteredCount: number,
): Html => {
  const h = html<Message>()

  return h.keyed('section')(
    section.id,
    [h.Class('rounded-xl border border-gray-200 bg-white shadow-sm')],
    [
      sectionHeaderView(section, Array.length(visible)),
      sectionBodyView(visible, filteredCount),
      addButtonView(),
    ],
  )
}

const sectionView =
  (filter: Filter) =>
  (section: Section): Html => {
    const visible = Array.filter(section.items, item =>
      matchesFilter(filter, item),
    )
    const filteredCount = Array.length(section.items) - Array.length(visible)

    return section.collapsed
      ? collapsedSectionView(section, Array.length(visible))
      : expandedSectionView(section, visible, filteredCount)
  }

const filterButtonView = (
  current: Filter,
  key: Filter,
  label: string,
): Html => {
  const h = html<Message>()

  const isActive = current === key

  return Button.view<Message>({
    onClick: SelectedFilter({ filter: key }),
    toView: attributes =>
      h.button(
        [
          ...attributes.button,
          h.Class(
            `rounded-md px-2.5 py-1 ${
              isActive
                ? 'bg-blue-100 font-medium text-blue-700'
                : 'text-gray-500 hover:text-gray-900'
            }`,
          ),
        ],
        [label],
      ),
  })
}

const filterView = (filter: Filter): Html => {
  const h = html<Message>()

  return h.div(
    [
      h.AriaLabel('Done filter'),
      h.Class(
        'flex items-center rounded-lg border border-gray-200 bg-gray-50 p-0.5 text-sm',
      ),
    ],
    [
      filterButtonView(filter, 'Open', 'Open'),
      filterButtonView(filter, 'Done', 'Done'),
      filterButtonView(filter, 'All', 'All'),
    ],
  )
}

const brandView = (): Html => {
  const h = html<Message>()

  return h.div(
    [h.Class('flex shrink-0 items-center gap-2')],
    [
      h.span(
        [
          h.Class(
            'grid h-7 w-7 place-items-center rounded-md bg-blue-600 text-white',
          ),
        ],
        [checkIcon('h-4 w-4')],
      ),
      h.span(
        [h.Class('text-base font-semibold tracking-tight')],
        ['simply-gtd'],
      ),
    ],
  )
}

const headerView = (filter: Filter): Html => {
  const h = html<Message>()

  return h.header(
    [
      h.Class(
        'sticky top-0 z-20 border-b border-gray-200 bg-white/90 backdrop-blur',
      ),
    ],
    [
      h.div(
        [
          h.Class(
            'mx-auto flex max-w-[680px] items-center justify-between gap-3 px-4 py-3',
          ),
        ],
        [brandView(), filterView(filter)],
      ),
    ],
  )
}

const boardView = (sections: ReadonlyArray<Section>, filter: Filter): Html => {
  const h = html<Message>()

  return Array.match(sections, {
    onEmpty: () =>
      h.p(
        [h.Class('text-sm text-gray-500')],
        ['No sections yet. Add one to get started.'],
      ),
    onNonEmpty: presentSections =>
      h.div(
        [h.Class('flex flex-col gap-4')],
        Array.map(presentSections, sectionView(filter)),
      ),
  })
}

export const view = (model: Model): Document => {
  const h = html<Message>()

  return {
    title: 'simply-gtd | preview v001 — board',
    body: h.div(
      [h.Class('min-h-screen bg-gray-100 text-gray-900')],
      [
        headerView(model.filter),
        h.main(
          [h.Class('mx-auto max-w-[680px] px-4 py-6')],
          [boardView(model.sections, model.filter)],
        ),
      ],
    ),
  }
}
