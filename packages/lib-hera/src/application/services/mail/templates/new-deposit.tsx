import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

import React from 'react'

interface NewDepositProps {
  deposit: number
}

export function NewDeposit({ deposit }: NewDepositProps) {
  const previewText = `Olá, estamos enviando esse email para confirmar um novo valor depositado `
  console.log(typeof React)
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px] text-center">
              <span className="text-2xl">💰</span>
            </Section>

            <Text>{previewText}</Text>
            <Text className="text-black font-bold text-[24px] text-center leading-[24px]">
              Valor Depositado:
            </Text>
            <Text className="text-black font-bold text-[24px] text-center leading-[24px]">
              {(deposit / 100).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </Text>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Se você não solicitou esse email, por favor desconsidere.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
