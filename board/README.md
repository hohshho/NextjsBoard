
# 1. 프로젝트 폴더/파일 구조

```
root
├── .vscode
├── .next
├── node_modules
├── public
├── src/app
│   ├── (page)
│   ├── api
│   ├── component     : 공통(여러 페이지에서 사용되는) 컴포넌트
│   ├── constants
│   ├── hooks
│   ├── store
│   ├── styles
│   ├── types
│   ├── util
├── .prettier
├── eslint.config.mjs
├── ackage.json
```

# 2. 네이밍 규칙

- Component는 대문자로 시작 (파스칼 케이스)
- 변수, 함수명은 카멜 케이스로 작성
  - ex) dailyUserTable
- type정의  
  - types폴더 아래 api, component, page별로 {파일명}.d.ts파일을 만들어 선언한다.
- 폴더명, 파일명
  - 페이지 별 컴포넌트는 _fragments폴더를 만들어 하위에 생성한다.
  - 컴포넌트 생성하는 경우
    - 1. 공통 컴포넌트
      - 여러 페이지에서 사용될 경우 분리
    - 2. 클라이언트 컴포넌트
    - 3. HTML파일 구조가 복잡해 300라인이 넘는 경우

# 3. 코드 스타일

## 3.1 Prettier

## 3.2 eslint

# 4. HTTP 통신

## 4.1 서버측 HTTP 통신

## 4.2 클라이언트측 HTTP 통신

# 5. 상태 처리

- props 사용
  - 특정 페이지, 컴포넌트에서만 사용하는 경우
- zustand(전역 상태) 사용
  - 여러 컴포넌트에 영향을 미치는 경우
  - 페이지 간 이동시에도 헤더 상태를 보존해야 하는 경우
  - 여러 컴포넌트에서 헤더 상태를 변경할 수 있어야 하는 경우

# 6. 스타일 가이드