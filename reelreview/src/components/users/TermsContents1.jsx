import React from 'react';
import styles from '../../css/users/Terms.module.css';

// 서비스 이용약관 모달창
function TermsContens1() {

    return(
        <div className={styles.user_terms_modal_2}>
            <div className={styles.user_terms_buttonX}></div>
            <div className={styles.user_terms_title}>서비스 이용약관</div>
            <hr className={styles.user_terms_hr}></hr>
            <div className={styles.user_terms_contents}>
                {`릴리뷰 이용약관

                본 약관은 2023년 07월 27일부터 적용됩니다.

                제 1 조 목적
                이 약관은 주식회사 릴리뷰(이하 "회사")에서 제공하는 릴리뷰 및 릴리뷰 에서 제공하는 제반 서비스(이하 "서비스")에 접속과 사용자에 의해서 업로드 및 다운로드 되어 표시되는 모든 정보, 텍스트, 이미지 및 기타 자료를 이용하는 이용자(이하 "회원")와 서비스 이용에 관한 권리 및 의무와 책임사항, 기타 필요한 사항을 규정하는 것을 목적으로 합니다.

                제2조 약관의 게시와 효력, 개정
                ① 회사는 서비스의 가입 과정에 본 약관을 게시합니다.
                ② 회사는 관련법에 위배되지 않는 범위에서 본 약관을 변경할 수 있으며, 개정 전 약관과 함께 적용일자 7일 전부터 웹사이트에서 확인할 수 있도록 게시합니다. 다만, 이용자에게 불리하게 약관을 변경하는 경우에는 적용일자 30일 전에 개정내용을 이용자가 확인할 수 있도록 게시합니다.
                ③ 회원은 회사가 전항에 따라 변경하는 약관에 동의하지 않을 권리가 있으며, 이 경우 회원은 회사에서 제공하는 서비스 이용 중단 및 탈퇴 의사를 표시하고 서비스 이용 종료를 요청할 수 있습니다. 다만, 회사가 회원에게 변경된 약관의 내용을 통보하면서 회원에게 "7일 이내 의사 표시를 하지 않을 경우 의사 표시가 표명된 것으로 본다는 뜻"을 명확히 통지하였음에도 불구하고, 거부의 의사표시를 하지 아니한 경우 회원이 변경된 약관에 동의하는 것으로 봅니다.

                제3조 약관의 해석과 예외 준칙
                ① 회사는 제공하는 개별 서비스에 대해서 별도의 이용약관 및 정책을 둘 수 있으며, 해당 내용이 이 약관과 상충할 경우 개별 서비스의 이용약관을 우선하여 적용합니다.
                ② 본 약관에 명시되지 않은 사항이 관계법령에 규정되어 있을 경우에는 그 규정에 따릅니다.

                제4조 용어의 정의
                ① 서비스: 개인용 컴퓨터(PC), TV, 휴대형 단말기, 전기통신설비 등 포함 각종 유무선 장치와 같이 구현되는 단말기와 상관없이 회원이 이용할 수 있는 릴리뷰 및 릴리뷰 관련 제반 서비스를 의미합니다. 제반 서비스에는 개발자 및 서비스 제공자가 릴리뷰  Open Application Programming Interface 서비스와 이를 이용하여 개발한 API 응용 애플리케이션 또는 웹서비스도 포함됩니다.
                ② 회원: 회사와 서비스 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 모든 사용자를 의미합니다. 단, 회원이 생성한 계정을 통해 가족 구성원이 함께 이용할 수 있는 서비스에 가입한 경우에는 그 가족 구성원(이하 “가족 구성원”)을 포함하는 의미로 사용될 수 있습니다.
                ③ 아이디: 회원의 식별 및 서비스 이용을 위하여 회원이 선정하고 회사가 부여한 문자 및 숫자의 조합을 의미합니다.
                ④ 비밀번호: 회원의 개인 정보보호 및 확인을 위해서 회원이 정한 문자 또는 숫자의 조합을 의미합니다.
                ⑤ 도메인: 회원의 서비스 이용을 위하여 회원이 신청하여 회사가 부여한 고유한 인터넷 주소를 의미합니다. 회사는 제공하는 제반 서비스를 위해서 서비스에 따라 별도의 도메인 주소를 추가적으로 제공합니다.
                ⑥ 게시물: 회원이 서비스를 이용함에 있어 회원이 서비스에 게시한 문자, 문서, 그림, 음성, 링크, 파일 혹은 이들의 조합으로 이루어진 정보 등 모든 정보나 자료를 의미합니다.
                ⑦ 유료서비스: 회사가 유료로 제공하는 각종 온라인 디지털콘텐츠 및 제반 서비스를 의미합니다.

                제5조 이용계약의 체결
                ① 이용계약은 회원이 릴리뷰 서비스 및 제반 서비스에서 제공하는 회원 가입 페이지에서 서비스 이용약관에 동의한 후 이용신청을 하고 신청한 내용에 대해서 회사가 승낙함으로써 체결됩니다.
                ② 회사는 이용약관에 동의한 후 이용신청한 사용자에 대해서 원칙적으로 접수 순서에 따라 서비스 이용을 승낙함을 원칙으로 합니다. 다만 업무 수행상 또는 기술상 지장이 있을 경우 일정시간 가입승인을 유보할 수 있습니다.
                ③ 회사는 다음 각 호에 해당하는 신청에 대해서 승낙하지 않거나 사후에 이용계약을 해지할 수 있습니다.
                - 가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우
                - 제3자의 전자우편 주소를 이용하여 신청한 경우
                - 허위의 정보를 기재하거나, 회사가 필수적으로 입력을 요청한 부분을 기재하지 않은 경우
                - 부정한 용도로 서비스를 사용하고자 하는 경우
                - 이용자의 귀책 사유로 인하여 승인이 불가능하거나 기타 규정한 제반 사항을 위반하며 신청하는 경우
                - 회사의 정책에 적합하지 않은 회원으로 판단되는 경우 또는 서비스 제공이 곤란한 경우
                - 회원의 이용 목적이나 서비스 이용 방법이 회사의 재산권이나 영업권을 침해하거나 침해할 우려가 있는 경우
                - 비정상적인 방법을 통하여 아이디 및 도메인을 대량으로 생성하는 경우
                ④ 회사는 회원에 대해 회사 정책에 따라 등급별로 구분하여 이용 시간, 이용 횟수, 서비스 메뉴 등을 세분하여 이용에 차등을 둘 수 있습니다.
                ⑤ 회원은 회사에 언제든지 회원 탈퇴를 요청하여 이용 계약을 해지할 수 있습니다.
                ⑥ 회원은 회원 가입 시 기재한 개인정보의 내용에 변경이 발생한 경우, 즉시 변경사항을 정정하여 기재하여야 합니다. 변경의 지체로 인하여 발생한 회원의 손해에 대해 회사는 책임을 지지 않습니다.
                ⑦ 회사는 관련 법률 및 회사의 개인정보처리방침에서 정한 바에 따라 회원에게 제공을 요청하는 회원정보 및 기타정보 항목을 추가, 삭제 등 변경하여 수집 및 이용할 수 있습니다.

                제6조 개인정보보호 의무
                ① 회사는 정보통신망법 등 관계 법령이 정하는 바에 따라 회원의 개인정보를 보호하기 위해 노력합니다. 개인정보의 보호 및 사용에 대해서는 관련법 및 회사의 개인정보처리방침이 적용됩니다. 다만, 회사의 공식 사이트 이외의 링크된 사이트에서는 회사의 개인정보처리방침이 적용되지 않습니다.
                ② 회사는 서비스를 중단하거나 회원이 개인정보 제공 동의를 철회한 경우 신속하게 회원의 개인정보를 파기합니다. 단, 회사는 전자상거래 등에서의 소비자보호에 관한 법률 등 관련 법률에 따라 보존의무를 부담하는 경우, 해당 범위에서 개인정보를 보관할 수 있으며 자세한 내용은 개인정보처리방침에서 정하는 바에 의합니다.
                ③ 회사는 서비스 개선 및 회원 대상 서비스 소개 등의 목적으로 회원의 동의 하에 관계 법령에서 정하는 바에 따라 추가적인 개인정보를 수집할 수 있습니다.
                ④ 회사는 법률에 특별한 규정이 있는 경우를 제외하고는 회원의 별도 동의 없이 회원의 계정정보를 포함한 일체의 개인정보를 제3자에게 공개하거나 제공하지 아니합니다. 단, 회원 본인의 가족 구성원은 서비스 이용 과정에서 회원 본인의 개인정보를 볼 수 있습니다.
                ⑤ 회사는 향후 제공하는 서비스에서 회원의 편의를 위해서 회원의 계정 정보를 사용할 수 있도록 링크 및 기타 방법을 제공할 수 있습니다.

                제7조 회원의 아이디 및 비밀번호
                ① 회원은 아이디와 비밀번호에 관해서 관리책임이 있습니다.
                ② 회원은 아이디 및 비밀번호를 본인과 본인의 가족 구성원을 제외한 제3자가 이용하도록 제공하여서는 안됩니다.
                ③ 회사는 회원이 아이디 및 비밀번호를 소홀히 관리하여 발생하는 서비스 이용상의 손해 또는 회사의 고의 또는 중대한 과실이 없는 제3자의 부정이용 등으로 인한 손해에 대해 책임을 지지 않습니다.
                ④ 회원은 아이디 및 비밀번호가 도용되거나 제3자가 사용하고 있음을 인지한 경우 이를 즉시 회사에 통지하고 회사의 안내에 따라야 합니다.

                제8조 회사의 의무
                ① 회사는 계속적이고 안정적인 서비스의 제공을 위하여 최선을 다하여 노력합니다.
                ② 회사는 회원이 안전하게 서비스를 이용할 수 있도록 현재 인터넷 보안기술의 발전수준 및 회사가 제공하는 서비스의 성격에 적합한 보안시스템을 갖추고 운영해야 합니다.
                ③ 회사는 서비스를 이용하는 회원으로부터 제기되는 의견이나 불만이 정당하다고 인정할 경우를 이를 처리하여야 합니다. 이때 처리과정에 대해서 회원에게 메일 및 게시판 등의 방법으로 전달합니다.
                ④ 회사는 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 통신비밀보호법, 전기통신사업법 등 서비스의 운영, 유지와 관련 있는 법규를 준수합니다.

                제9조 회원의 의무

                ① 회원은 관계법, 이 약관의 규정, 이용안내 및 서비스와 관련하여 공지한 주의사항, 회사가 통지하는 사항 등을 준수하여야 하며, 기타 회사의 업무에 방해되는 행위를 하여서는 안 됩니다.
                ② 회원은 회사의 사전 허락 없이 회사가 정한 이용 목적과 방법에 반하여 영업/광고활동 등을 할 수 없고, 회원의 서비스 이용이 회사의 정보자산, 재산권, 영업권 또는 비즈니스 모델을 침해하여서는 안됩니다.
                ③ 회원은 회사의 명시적 사전 동의가 없는 한 서비스의 이용권한 및 기타 이용계약 상의 지위를 회원 본인의 가족 구성원을 제외한 제3자에게 양도, 증여, 대여할 수 없으며 이를 담보로 제공할 수 없습니다.
                ④ 회원은 다음 각호에 해당하는 행위를 해서는 안됩니다.
                - 이용 신청 또는 회원정보 변경 시 허위내용 등록
                - 타인의 정보 도용
                - 회사의 운영자, 임직원, 회사를 사칭하거나 관련 정보를 도용
                - 회사가 게시한 정보의 변경
                - 회사와 기타 제3자의 저작권, 영업비밀, 특허권 등 지적재산권에 대한 침해
                - 회사와 다른 회원 및 기타 제3자를 모욕, 비방, 희롱, 위협하거나 명예를 손상시키는 행위
                - 외설, 폭력적인 메시지, 기타 공서양속에 반하는 정보를 공개 또는 게시하는 행위
                - 해킹을 통해서 다른 사용자의 정보를 취득하는 행위
                - 기타 현행 법령에 위반되는 불법적인 행위
                ⑤ 회사는 회원의 게시물에 대하여 자동화된 시스템을 통하여 욕설 등을 모니터링하여 이를 비공개처리할 수 있습니다.
                ⑥ 회사는 회원이 전항에서 금지한 행위를 하는 경우, 위반 행위의 경중에 따라 서비스의 이용을 정지하거나, 이용 계약의 해지, 회원 자격의 상실 등의 조치를 취할 수 있습니다.


                제10조 서비스의 제공 및 변경
                ① 회사는 회원에게 아래와 같은 서비스를 제공합니다.
                - 릴리뷰 및 릴리뷰 통합계정 서비스
                - 기타 회사가 추가 개발하거나 다른 회사와의 제휴계약 등을 통해 회원에게 제공하는 일체의 서비스
                ② 회사는 정보통신설비의 보수점검, 교체 및 고장, 통신두절 또는 운영상 상당한 이유가 있는 경우 서비스의 제공을 일시적으로 중단할 수 있습니다. 이 경우 회사는 회원에게 공지사항 게시판 게시 및 전자우편 발송 등의 방법으로 통지합니다. 다만, 회사가 사전에 통지할 수 없는 부득이한 사유가 있는 경우 사후에 통지할 수 있습니다.
                ③ 회사는 회원과 별도로 서면 계약을 체결하여 서비스의 브랜드 특성을 이용할 수 있는 명시적인 권리를 부여하지 아니하는 한, 회원에게 회사 또는 서비스의 상호, 상표, 서비스표, 로고, 도메인 네임 및 기타 식별력 있는 브랜드 특성을 이용할 수 있는 권리를 부여하지 않습니다.
                ④ 회사가 제공하는 서비스의 형태와 기능, 디자인 등은 필요한 경우 수시로 변경되거나 중단될 수 있습니다. 회사는 이 경우 개별적인 변경에 대해서 회원에게 사전 통지하지 않습니다. 다만, 회원에게 불리한 것으로 판단되는 경우 전자우편으로 통하여 이를 공지합니다.
                ⑤ 전항에 의해서 제공되는 서비스가 변경 및 중단될 경우 무료로 제공되는 서비스에 대해서는 회원에게 별도로 보상하지 않습니다.

                제11조 광고의 게재
                ① 회사는 서비스 운영과 관련하여 회원정보, 회원이 입력한 정보를 활용하여 광고를 게재할 수 있습니다. 회원은 서비스 이용 시 노출되는 맞춤 광고 게재에 대해 동의합니다.
                ② 회사는 서비스상에 게재되어 있거나 서비스를 통한 광고주의 판촉활동에 회원이 참여하거나 교신 또는 거래를 함으로써 발생하는 손실과 손해에 대해 책임을 지지 않습니다.

                제12조 전자우편을 통한 정보의 제공
                ① 회사는 회원이 서비스 이용에 필요하다고 인정되는 다양한 정보를 회원이 제공한 전자우편 주소로 제공할 수 있습니다.
                ② 회사는 서비스 운영을 위해 회원정보를 활용하여 광고성 전자우편을 전송할 수 있습니다. 회원이 이를 원하지 않는 경우에는 언제든지 서비스 홈페이지 또는 서비스 내부 설정 페이지 등을 통하여 수신거부를 할 수 있습니다.
                ③ 회사는 다음 각호에 해당하는 경우 회원의 동의여부와 상관없이 전자우편으로 발송할 수 있습니다.
                - 이용 신청에서 입력한 전자우편 주소의 소유를 확인하기 위해서 인증 메일을 발송하는 경우
                - 회원의 정보가 변경되어 확인하기 위해서 인증 메일을 발송하는 경우
                - 기타 서비스를 제공함에 있어 회원이 반드시 알아야 하는 중대한 정보라고 회사가 판단하는 경우

                제13조 서비스 이용의 제한
                ① 회사는 천재지변이나 국가비상사태, 해결이 곤란한 기술적 결함 또는 서비스 운영의 심각한 변화 등 불가항력적인 경우가 발생 또는 발생이 예상될 때는 서비스의 전부 또는 일부를 예고 없이 제한하거나 중지할 수 있습니다.
                ② 서비스를 이용하게 됨으로써 서비스 영역에서 발생하는 회원 사이의 문제에 대해 회사는 책임을 지지 않습니다.
                ③ 회원의 관리 소홀로 인하여 ID 및 비밀번호의 유출로 인해 회원에게 서비스 이용상의 손해가 발생하거나 제3자에 의한 부정이용 등으로 회원의 의무조항을 위반한 경우 ID 및 해당 도메인의 이용이 제한될 수 있습니다.
                ④ 회사가 본 약관 제9조의 위반 행위를 조사하는 과정에서 당해 회원 ID 및 도메인이 특정 위반행위에 직접적으로 관련되어 있는 경우 등 다른 회원의 권익 보호 및 서비스의 질서유지를 위해 불가피할 경우에는 해당 ID 및 도메인의 이용을 일시적으로 정지할 수 있습니다. 이에 대해 회원은 서비스 홈페이지 또는 전자우편 등을 통해 이의신청을 할 수 있습니다.

                제14조 게시물의 권리와 책임
                ① 회원이 서비스 내에 작성한 게시물에 대한 책임 및 권리는 게시물을 등록한 회원에게 있습니다. 여기서 게시물이란 회원이 자신 또는 타인이 보게 할 목적으로 게재한 음성, 음향, 글, 문자, 부호, 사진, 동영상, 링크 등으로 구성된 각종 콘텐츠 자체 또는 파일을 말합니다.
                ② 서비스에 대한 저작권 및 지적재산권, 회사가 제공하는 각종 컨텐츠의 저작권은 회사(또는 회사에게 이용허락을 제공한 라이센서)에 귀속됩니다. 회원의 게시물에 대한 저작권은 회원에게 귀속됩니다. 회사는 회사가 회원의 게시물을 집계하고 분석하여 만들어 낸 데이터에 대하여는 완전한 권리를 가집니다.
                ③ 회원은 회원이 별도로 삭제하지 않는 한, 회원의 게시물을 서비스 내 노출, 서비스 홍보를 위한 활용, 서비스 운영 및 개선, 새로운 개발을 위한 통계 조사 및 연구 등의 목적으로 노출, 사용, 저장, 수정, 복제, 전송, 공연, 전시, 배포, 공중송신 등의 방법으로 전세계적이고 영구적인 범위에서 이용할 권리를 회사에게 허락합니다. 여기에는 다음과 같은 이용형태를 포함하되, 이에 한정되지 않습니다.
                - 서비스(제3자가 운영하는 사이트 또는 미디어의 일정 영역 내에 입점하여 서비스가 제공되는 경우를 포함합니다)내에서 게시물을 사용하기 위하여 게시물의 크기를 변환하거나 단순화하는 등의 방식으로 수정하는 것
                - 회사에서 운영하는 다른 사이트 또는 다른 회사가 운영하는 사이트에 게시물을 복제ㆍ전송ㆍ전시하는 것
                - 회사의 서비스를 홍보하기 위한 목적으로 미디어, 통신사 등에게 게시물의 내용을 보도, 방영하게 하는 것. 단, 이 경우 회사는 회원의 공개설정 범위에 따라 미디어, 통신사 등에게 게시물을 제공할 수 있으며, 회원의 개별 동의가 없이는 회원정보를 제공하지 않습니다.
                ④ 회원이 회원탈퇴를 한 경우에는 해당 회원 도메인에 기록된 저작물 일체는 삭제됩니다. 단, 저작물이 공동 저작을 통해 작성된 경우에는 공동 저작자의 도메인에 해당 게시물이 남을 수 있고, 제3자에 의하여 보관되거나 무단복제 등을 통하여 복제됨으로써 해당 저작물이 삭제되지 않고 재게시된 경우에 대하여 회사는 책임을 지지 않습니다. 또한, 본 약관 및 관계 법령을 위반한 회원의 경우 다른 회원을 보호하고, 법원, 수사기관 또는 관련 기관의 요청에 따른 증거자료로 활용하기 위해 회원탈퇴 후에도 관계 법령이 허용하는 한도에서 회원의 아이디 및 회원정보를 보관할 수 있습니다.
                ⑤ 회원의 게시물이 회사 또는 제3자의 저작권, 명예, 개인정보 등 각종 권리를 침해함으로써 발생하는 민∙형사상의 책임은 회원에게 있습니다.


                제15조 게시물의 관리
                ① 회원의 게시물이 정보통신망법 및 저작권법 등 관련법에 위반되는 내용을 포함하는 경우, 권리자는 관련법이 정한 절차에 따라 해당 게시물의 게시중단 및 삭제 등을 요청할 수 있으며, 회사는 관련법에 따라 조치를 취합니다.
                ② 회사는 전항에 따른 권리자의 요청이 없는 경우라도 권리침해가 인정될 만한 사유가 있거나 본 약관 및 기타 회사 정책, 관련법에 위반되는 경우에는 관련법에 따라 해당 게시물에 대해 임시조치 등을 취할 수 있습니다.
                ③ 회원이 비공개로 설정한 게시물에 대해서는 회사를 포함한 다른 사람이 열람할 수 없습니다. 단, 법원, 수사기관이나 기타 행정기관으로부터 정보제공을 요청 받은 경우나 기타 법률에 의해 요구되는 경우에는 회사를 포함한 다른 사람이 해당 게시물을 열람할 수 있습니다.


                제16조 서비스 이용의 중지 및 해지
                ① 회원은 회사에 언제든지 회원 탈퇴를 요청할 수 있으며, 회사는 이와 같은 요청을 받았을 경우, 회사가 별도로 고지한 방법에 따라 신속하게 처리합니다.
                ② 회원이 서비스의 이용중지를 원하는 경우에는 회사가 제공하는 서비스 페이지 또는 전자우편 등의 방법으로 회사에 중지신청을 할 수 있습니다. 회사는 이와 같은 요청을 받았을 경우, 회사가 별도로 고지한 방법에 따라 신속하게 처리합니다.
                ③ 회사는 회원이 본 약관 제9조의 이용자의 의무를 위반한 경우 및 서비스의 정상적인 운영을 방해한 경우에는 사전 통보 후 회원 자격을 제한, 이용계약을 해지하거나 또는 기간을 정하여 서비스의 이용을 중지할 수 있습니다.
                ④ 회사는 전항에도 불구하고, 저작권법을 위반한 불법 프로그램의 제공 및 운영방해, 정보통신망법을 위반한 불법통신 및 해킹, 악성 프로그램의 배포, 접속권한 초과행위 등과 같이 관련법을 위반한 경우에는 즉시 영구이용정지를 할 수 있습니다.
                ⑤ 회사는 회원이 계속해서 3개월 이상 로그인하지 않는 경우, 회원정보의 보호 및 운영의 효율성을 위해 이용을 제한할 수 있습니다.
                ⑥ 회원은 본 조에 따른 이용제한 등에 대해 회사가 정한 절차에 따라 이의신청을 할 수 있습니다. 이 때 이의가 정당하다고 회사가 인정하는 경우 회사는 즉시 서비스의 이용을 재개합니다.

                제17조 책임제한
                ① 회사는 회원의 약관, 서비스 이용 방법 및 이용 기준을 준수하지 않는 등 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.
                ② 회사는 회원이 서비스를 통하여 게재한 정보, 자료, 사실의 신뢰도, 정확성 등의 내용에 관하여는 보증하지 않습니다.
                ③ 회사는 회원 간 또는 회원과 제3자 상호간에 서비스를 매개로 하여 거래, 연락 등을 한 경우에 대하여 개입하지 않으며, 이로 인하여 회원 간에 발생하는 일체의 분쟁, 손해에 대하여 책임이 면제됩니다.
                ④ 회사는 무료로 제공되는 서비스 이용과 관련하여 관련법에 특별한 규정이 없는 한 책임을 지지 않습니다.
                ⑤ 회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중지, 제3자가 제공하는 오픈아이디의 인증 장애, 해결이 곤란한 기술적 결함 기타 불가항력으로 인하여 서비스를 제공할 수 없는 경우 책임이 면제됩니다.
                ⑥ 회사는 사전에 공지된 서비스용 설비의 보수, 교체, 정기점검, 공사 등 부득이한 사유로 서비스가 중지되거나 장애가 발생한 경우에 대하여 책임이 면제됩니다.
                ⑦ 회사가 제공하는 서비스 및 서비스 이용을 위한 어플리케이션은 "있는 그대로" 제공하는 것으로서, 회원이 자신의 결정에 의하여 이를 이용하는 과정에서 특정 프로그램이나 정보 등을 다운로드받거나 접근함으로써 입게 되는 컴퓨터 시스템상의 손해나 데이터, 정보의 상실에 대하여는 회사는 책임을 지지 않습니다.
                ⑧ 회원의 컴퓨터 오류, 신상정보 및 전자우편 주소의 부정확한 기재, 비밀번호 관리의 소홀 등 회원의 귀책사유로 인해 손해가 발생한 경우에 대하여 회사는 책임을 지지 않습니다.
                ⑨ 회사는 회원의 컴퓨터 환경 문제나 회사의 관리 범위에 있지 아니한 보안 문제로 인하여 발생하는 제반 문제 또는 현재의 보안기술 수준으로 방어가 곤란한 네트워크 해킹 등 회사의 귀책사유 없이 발생하는 문제에 대해서 책임을 지지 않습니다.
                ⑩ 회사는 서비스 내 제공한 내용에 대한 중요 정보의 정확성, 내용, 완전성, 적법성, 신뢰성 등에 대하여 보증하거나 책임을 지지 않으며, 사이트의 삭제, 저장실패, 잘못된 인도, 정보 제공에 대한 책임을 지지 않습니다.
                ⑪ 회사는 회원이 서비스를 이용하여 기대하는 효용을 얻지 못한 것에 대하여 책임을 지지 않으며 서비스에 대한 취사 선택 또는 이용으로 발생하는 손해 등에 대하여 책임이 면제됩니다.



                제18조 준거법 및 재판관할
                ① 회사와 회원 간 제기된 소송에는 대한민국법을 준거법으로 합니다.
                ② 회사와 회원간 발생한 분쟁에 관한 소송은 민사소송법 상의 관할법원에 제소합니다.`}
            </div>
        </div>
    )
}

export default TermsContens1;