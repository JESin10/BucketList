# Bucket List 사이트

23.08.26 - 23.08.

<!--
(🦋 포트폴리오 URL)[]


## 📌 서비스 소개

나만의 버킷리스트를 적고, 공유하는 사이트입니다.
Firebase와 TypeScript를 기반으로 하였으며, Tailwind CSS framework를 사용하였습니다.


## 📌 기술 스택

FrontEnd: React, Typescript, Tailwind
Deployment : Vercel
Database : Firebase


## 📌 서비스 구현 상세

<details><summary> ◼︎ 성능 최적화 (with LightHouse) </summary>

성능 최적화를 위해 lazy를 이용해 컴포넌트를 필요한 때에 불러올 수 있도록 구현하였습니다.



그 결과 00점의 ~~가 00점으로, 00점의 ~~가 00점으로 상승하는 결과를 보일 수 있었습니다.

또한 image를 적절한 확장자로 변경하여 초기 렌더링 속도를 0초에서 0초로 감소 시킬 수 있었습니다.

#### LightHouse 결과 이미지

<img width="40%" alt="성능 개선 전" src=" "> <img width="40%" alt="성능 개선 후" src=" ">

</details>



✅ Firebase를 통한 User, Data 관리

Firebase를 사용해 소셜로그인, 일반 로그인을 구현하고 유저가 가진 Bucket-list data를 관리하였습니다.

Data의 경우 유저를 난수로 지정하고 테이블 상에 카테고리별로, 완료여부 별로 나누어 저장하였습니다.

User의 currentUser 여부를 이용해 비로그인 사용자의 경우 메인페이지를, 로그인 사용자의 경우 자신의 Dashboard 페이지가 노출됩니다.

✅ Tailwind + Styled-component

스타일의 확장성과 유지보수를 위해 Tailwind를 사용했고, 웹페이지의 생동감 및 활동성을 부여하기 위해 react-typical, react-icons를 활용하였습니다.

또한 컴포넌트 단위의 장점인 리액트의 특징을 살리고자 styled-component를 함께 결합한 tailwind-styled-component를 사용했습니다.


✅ Next.js

포트폴리오 사이트는 정적 페이지고 페이지 전환이 없기에 빠른 초기 렌더링이 중요했고,

많은 이들에게 노출되기 위해 SEO도 신경써야 했기에 Next.js를 사용해서 페이지를 구현했습니다.

Next.js를 학습하면서 기술의 위대함을 느꼈고, 폴더 기반 라우팅의 편리함에 감탄했습니다.

✅ Typescript

기본적인 CRUD에 익숙해지고자 하였으며, 컴파일 단계에서 에러를 발견했기에 빠른 유지보수가 가능했습니다.

규모가 큰 서비스일수록 타입스크립트를 사용해야한다는 이유를 체감했습니다.

-->
