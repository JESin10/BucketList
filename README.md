# Bucket List 사이트

23.08.30 - 23.09.06

(📚 BucketList URL)[https://bucketcheckit.vercel.app]

◼︎ test-Account( test1@gmail.com / test1111 )

## 📌 서비스 소개

나만의 버킷리스트를 적고, 공유하는 사이트입니다.
Firebase와 TypeScript를 기반으로 하였으며, Tailwind CSS framework를 사용하였습니다.
Database 및 Auth는 구글의 모바일 및 웹 애플리케이션 개발 플랫폼인 Firebase를 이용하였습니다.

## 📌 기술 스택

FrontEnd: <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/tailwindCss-06B6D4?style=for-the-badge&logo=tailwindCss&logoColor=white"> <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled components&logoColor=white">
Deployment : <img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
Database : <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=black">

## 📌 서비스 페이지 예시

<img width="50%" alt="Dashboard_all" src="https://github.com/JESin10/BucketList/assets/119720123/76e8101c-c058-4ef8-b902-25d24ed6daea"> <img width="50%" alt="Dashboard_tr" src="https://github.com/JESin10/BucketList/assets/119720123/3c3349a0-467d-4232-87e3-390c08762ca3"> <img width="50%" alt="Explore_fun" src="https://github.com/JESin10/BucketList/assets/119720123/7e283a1a-4c77-4a4c-9bc0-87633dc9a2fb"> <img width="50%" alt="Explore_tr" src="https://github.com/JESin10/BucketList/assets/119720123/06aad738-d1d7-4502-a9aa-cd0b72588775"> <img width="50%" alt="main" src="https://github.com/JESin10/BucketList/assets/119720123/20d50e97-8dd5-4b57-80e5-d2ba62f583eb"> <img width="50%" alt="main_2" src="https://github.com/JESin10/BucketList/assets/119720123/59887e37-90a0-4ea0-b46e-b05e046256f5">

## 📌 서비스 구현 상세

<!-- <details><summary> ◼︎ 성능 최적화 (with LightHouse) </summary>

성능 최적화를 위해 lazy를 이용해 컴포넌트를 필요한 때에 불러올 수 있도록 구현하였습니다.



그 결과 00점의 ~~가 00점으로, 00점의 ~~가 00점으로 상승하는 결과를 보일 수 있었습니다.

또한 image를 적절한 확장자로 변경하여 초기 렌더링 속도를 0초에서 0초로 감소 시킬 수 있었습니다.

#### LightHouse 결과 이미지

<img width="40%" alt="성능 개선 전" src=" "> <img width="40%" alt="성능 개선 후" src=" ">

</details>
 -->

✅ Firebase를 통한 User, Data 관리

Firebase를 사용해 소셜로그인, 일반 로그인을 구현하고 유저가 가진 Bucket-list data를 관리하였습니다.

Data의 경우 유저를 난수로 지정하고 테이블 상에 카테고리별로, 완료여부 별로 나누어 저장하였습니다.

User의 currentUser 여부를 이용해 비로그인 사용자의 경우 메인페이지를, 로그인 사용자의 경우 자신의 Dashboard 페이지가 노출됩니다.

✅ Tailwind + Styled-component

스타일의 확장성과 유지보수를 위해 Tailwind를 사용했고, 웹페이지의 생동감 및 활동성을 부여하기 위해 react-typical, react-icons를 활용하였습니다.

또한 컴포넌트 단위의 장점인 리액트의 특징을 살리고자 styled-component를 함께 결합한 tailwind-styled-component를 사용했습니다.

✅ Typescript

기본적인 CRUD에 익숙해지고자 하였으며, 컴파일 단계에서 에러를 발견했기에 빠른 유지보수가 가능했습니다.

규모가 큰 서비스일수록 타입스크립트를 사용해야한다는 이유를 체감했습니다.
