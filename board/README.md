
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
│   ├── component
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

- Component는 대문자로 시작

# 3. 코드 스타일

## 3.1 Prettier

## 3.2 eslint

# 4. HTTP 통신

# 5. 상태 처리

- props 사용
  - 특정 컴포넌트에서만 사용하는 경우
- zustand(전역 상태) 사용
  - 여러 컴포넌트에 영향을 미치는 경우
  - 페이지 간 이동시에도 헤더 상태를 보존해야 하는 경우
  - 여러 컴포넌트에서 헤더 상태를 변경할 수 있어야 하는 경우

# 6. 스타일 가이드