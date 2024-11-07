# nugget-app

![plot](./assets/images/screenshot.png)

일렉트론 기반 영상편집입니다. 기본적인 컷 편집과 애니메이션, 사운드 믹싱, 익스텐션을 통한 외부 라이브러리, 프로젝트 관리, 텍스트 편집 기능이 존재합니다. ffmpeg를 기반으로 렌더링 하며 빠른 속도를 자랑합니다. 상용 프로그램 대비 빠르게 편집할 수 있도록 개발되었습니다.

ui는 LitJS를 사용했습니다. 영상 재생과 편집을 위해 빠른 dom 성능이 필요해 적용했습니다.

스타일은 devent-design-system-v1을 사용합니다. 부트스트랩5의 의존성으로 인해 최근 React 버전인 v2로 업데이트 했으나 다른 언어 종속성을 줄이기 위해 조만간 React, Lit도 지원하는 v3 디자인 시스템을 개발할 예정입니다.

CDN과 인증 서버를 내리면서 몇 가지 기능이 deprecated 되었습니다. 로그인 및 CDN 다운로드 기능이 없어지면서, ffmpeg와 ffprobe를 따로 설치하셔야 합니다.

## 개선사항

엄청 많습니다. 기본적인 기능은 잘 동작합니다만, 몇 가지 개선사항이 존재합니다.

- [x] ipc, lib 폴더 분리
- [x] ce를 lit으로 전환
- [ ] 폰트 및 텍스트 랜더링시 폰트의 padding 문제 해결
- [x] zustand 적용 및 timeline 컴포넌트 간 상태공유 최적화
- [x] element timeline을 canvas로 전환
- [x] elementcontrolpreview 상태관리로 관리되도록
- [ ] elementcontrolpreview를 canvas로 전환
- [ ] ce에서 컴포넌트 props 방향(dom 프로퍼티 접근)을 모두 제거 (의존성 제거)
- [ ] 랜더링 프로세스 개선
- [ ] 텍스트 입력 개선

벌써 3번째 리팩토링인데 그동안 전혀 수정할 엄두를 못 내다가 예전에 해결 못한 문제를 어떻게 해결하는지 지금은 알고 있습니다. 지난 2년간 개인적으로 많이 성장했다고 느끼는 대목입니다. 영상편집 프로그램을 만드는 일이 막 대단한 기술은 아니지만, 적어도 상태 의존성 관리와 설계 측면을 배울 수 있다고 생각합니다.

사업하려고 만들다가 도저히 감당이 안되어서 오픈소스로 만들어 공개합니다. 코드 보시면 아시겠지만 개선 사항이 무지막지하게 많습니다.

## 설치

의존성을 설치해 줍니다.

```
npm install
```

TypeScript 컴파일과 번들 파일을 생성해줍니다. 모두 watch가 설정되어 있어 코드가 바뀌면 자동으로 변경됩니다.

ffmpeg와 ffprobe를 bin 폴더에 넣어줍니다. mac&windows 용 바이너리 파일은 https://github.com/cartesiancs/ffmpeg4nugget 에서 다운받으실 수 있습니다.

## 퍼미션 부여

`chmod -R 777 bin`로 ffmpeg, ffprobe의 권한을 부여해줍니다.

## 실행

마지막으로 일렉트론을 실행해줍니다.

```
npm run dev
npm run start
```
