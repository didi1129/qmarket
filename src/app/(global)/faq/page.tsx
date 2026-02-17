import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import LinkToOpenInquiryModal from "@/features/inquiry/ui/LinkToOpenInquiryModal";
import ButtonToMain from "@/shared/ui/LinkButton/ButtonToMain";
import SectionTitle from "@/shared/ui/SectionTitle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "자주 묻는 질문 (FAQ)",
  description:
    "큐마켓 이용 관련 자주 묻는 질문과 답변. 아이템 등록, 시세 계산 방식, 디스코드 연동 안내.",
};

export default function FAQPage() {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <ButtonToMain className="mb-12" />

      <SectionTitle className="text-center">자주 묻는 질문 (FAQ)</SectionTitle>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="faq-create-items" className="border-b">
          <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline py-4 text-gray-700">
            구매/판매 시 동일한 아이템을 여러 개 등록하고 싶어요.
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 p-4 bg-gray-50 border-t">
            <div className="leading-relaxed">
              - 동일 아이템을 2개 이상 구매하는 경우가 드물고,
              <br />
              - 동일 아이템을 한번에 여러 개 구매/판매 처리할 경우 시세 조작의
              가능성도 있어서
              <br /> 한 번에 1개의 아이템만 거래 완료 처리하도록 했습니다.
              <br /> 만약 확성기처럼 최소 10개 이상의 아이템을 한번에 거래해야
              할 경우, 거래 메시지에 관련 내용을 작성해주세요.
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="faq-price-how" className="border-b">
          <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline py-4 text-gray-700">
            시세는 어떻게 계산되나요?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 p-4 bg-gray-50 border-t">
            <div className="leading-relaxed">
              <p>큐마켓의 시세는 아래 거래 기록을 정리·요약해 계산됩니다.</p>

              <ul className="list-disc pl-4 mb-4 last:mb-0">
                <li>큐마켓에 등록된 거래 완료 데이터</li>
                <li>인게임 실제 거래 기록 (제보)</li>
              </ul>

              <p>수집된 데이터에 따라, 아래와 같은 가격 정보가 제공됩니다.</p>

              <ul className="list-disc pl-4 mb-4 last:mb-0">
                <li>
                  구매 희망가: 등록된 구매 가격을 바탕으로 한 수요 참고 지표
                </li>
                <li>
                  판매 희망가: 등록된 판매 가격을 바탕으로 한 호가 참고 지표
                </li>
                <li>
                  최근 거래가: 구매·판매가 완료된 거래 기록을 기준으로 한 시세
                  지표
                </li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="faq-price-trust" className="border-b">
          <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline py-4 text-gray-700">
            아이템 시세는 믿을 수 있는 데이터인가요?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 p-4 bg-gray-50 border-t">
            <div className="leading-relaxed">
              시세 정보는 참고용으로만 제공되고 있습니다. 보다 정확한 데이터가
              필요하신 경우 &apos;큐플레이 아카이브&apos; 디스코드 채널 또는
              별도 커뮤니티에서 추가로 확인해보시는 것을 권장드립니다.
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="faq-discord-current-server" className="border-b">
          <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline py-4 text-gray-700">
            디스코드 계정으로 로그인 시 &apos;현재 접속한 서버 확인하기&apos;는
            무슨 의미인가요?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 p-4 bg-gray-50 border-t">
            <div className="leading-relaxed">
              큐마켓은 &apos;큐플레이 아카이브&apos; 게임 데이터를 기준으로
              운영되고 있기 때문에, 구매자와 판매자의 원활한 소통을 위해
              통합적인 가입 기준을 제시하고자 디스코드 &apos;큐플레이
              아카이브&apos; 채널의 가입 여부를 확인하고 있습니다. 따라서 해당
              채널의 가입 여부만 확인하며, 그외 다른 디스코드 채널은 확인하지
              않습니다.
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <p className="mt-10 text-center text-sm text-gray-500">
        이외 궁금하신 점이 있으신가요? <LinkToOpenInquiryModal />
      </p>
    </div>
  );
}
