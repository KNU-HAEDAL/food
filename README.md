# 효율적인 학식 구매하기

## 📄 1. 소개

**효율적인 학식 구매하기** 프로젝트는 학식 구매를 더욱 간편하고 체계적으로
진행할 수 있는 웹 애플리케이션입니다.

학생들은 학식 메뉴를 확인하고, 실시간으로 결제와 구매를 진행할 수 있으며, 학식
수령 시 바코드로 인증해 대기 시간을 최소화할 수 있습니다.

이 프로젝트는 다음과 같은 문제를 해결하기 위해 시작되었습니다:

1. 학식 구매 과정에서 식권 결제 및 음식 대기를 위해 줄을 두 번 서는 불편함 해소
2. 메뉴별 재고를 미리 확인할 수 있는 기능을 통해 품절된 메뉴를 미리 알지 못해
   발생하는 문제 방지
3. 식권 대신 바코드를 발급하여 종이 낭비를 줄이고, 분실 걱정 없이 간편하게
   사용할 수 있는 바코드로 편리한 학식 구매 환경 제공

기존 식당에서 흔히 볼 수 있는 형태의 시스템이지만, 학교 내 식당에서는 학교이기에
학생들이 반드시 학식을 먹는것을 알고 있으므로 이러한 기능이 전혀 구현되지 않아
학생들이 많은 불편함을 겪고 있습니다. 이를 해소하기 위해 해당 기능을 구현해
보았습니다. 또한 각 식당별로 실시간 구매 및, 남은 수량을 알수있어 식당별 복잡도,
식당내 구역별 혼잡도를 알수있다는 차별화된 장점이 있습니다.

## ⚙️ 3. 기능

### 사용자 기능

- **회원가입 및 로그인** : JWT 기반 인증 시스템
- **메뉴 확인 및 학식 선택** : 실시간 학식 메뉴 및 가격 확인
- **결제 기능** : 아임포트(I'mport) API를 사용한 간편 결제
- **바코드 인증** : 구매 후 생성된 바코드를 통해 학식을 수령

### 관리자 기능

- **학식 재고 관리** : 메뉴별 재고 확인 및 감소
