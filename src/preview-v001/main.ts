import { Match as M, Schema as S } from 'effect'
import { Command, Runtime } from 'foldkit'
import { Document, Html, html } from 'foldkit/html'
import { m } from 'foldkit/message'

import { Button } from '@foldkit/ui'

// MODEL

export const Model = S.Struct({ greeting: S.String })
export type Model = typeof Model.Type

// MESSAGE

export const ClickedGreeting = m('ClickedGreeting')

export const Message = S.Union([ClickedGreeting])
export type Message = typeof Message.Type

// UPDATE

const FIRST_GREETING = 'hello, simply-gtd'
const SECOND_GREETING = 'hello again, simply-gtd'

export const update = (
  model: Model,
  message: Message,
): readonly [Model, ReadonlyArray<Command.Command<Message>>] =>
  M.value(message).pipe(
    M.withReturnType<
      readonly [Model, ReadonlyArray<Command.Command<Message>>]
    >(),
    M.tagsExhaustive({
      ClickedGreeting: () => [
        {
          greeting:
            model.greeting === FIRST_GREETING
              ? SECOND_GREETING
              : FIRST_GREETING,
        },
        [],
      ],
    }),
  )

// INIT

export const init: Runtime.ApplicationInit<Model, Message> = () => [
  { greeting: FIRST_GREETING },
  [],
]

// VIEW

export const view = (model: Model): Document => {
  const h = html<Message>()

  return {
    title: 'simply-gtd | preview v001',
    body: h.div(
      [h.Class('min-h-screen bg-white flex items-center justify-center p-6')],
      [helloButtonView(model.greeting)],
    ),
  }
}

const helloButtonView = (greeting: string): Html => {
  const h = html<Message>()

  return Button.view<Message>({
    onClick: ClickedGreeting(),
    toView: attributes =>
      h.button(
        [
          ...attributes.button,
          h.Class(
            'text-2xl font-semibold text-gray-900 hover:text-blue-600 transition',
          ),
        ],
        [greeting],
      ),
  })
}
