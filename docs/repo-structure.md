# Repo Structure Guide

이 저장소는 GitHub Pages 기반의 정적 결과 저장소입니다.

## 핵심 원칙

1. 시험 결과 원본 페이지는 `tests/YYYY-MM-DD/` 아래에 둡니다.
2. 루트 페이지 목록은 `data/tests.json` 을 기준으로 렌더링합니다.
3. 새 시험 추가 시 기존 HTML을 직접 편집하기보다 카탈로그와 해당 시험 폴더를 함께 업데이트합니다.

## 권장 디렉터리 구조

```text
.
|- data/
|  \- tests.json
|- docs/
|  \- repo-structure.md
|- templates/
|  \- test-entry.md
|- tests/
|  \- YYYY-MM-DD/
|     |- index.md
|     |- index.html
|     \- assets/
|        \- YYYY-MM-DD/
```

## 새 시험 추가 절차

1. `tests/YYYY-MM-DD/` 디렉터리를 생성합니다.
2. `index.md`, `index.html`, `assets/YYYY-MM-DD/` 를 추가합니다.
3. `templates/test-entry.md` 템플릿을 기준으로 내용을 작성합니다.
4. `data/tests.json` 맨 앞에 새 시험 메타데이터를 추가합니다.
5. 루트 페이지에서 카드가 정상적으로 보이는지 확인합니다.

## 메타데이터 필드 가이드

- `id`: 고유 식별자. 날짜와 시험 종류를 조합해 사용합니다.
- `date`: `YYYY-MM-DD`
- `title`: 루트 페이지에 노출할 제목
- `category`: `combustion` 같은 시험 분류
- `summary`: 한 줄 설명
- `status`: `published`
- `metrics`: 루트 페이지에서 보여줄 핵심 수치
- `issues`: 주요 이슈 목록
- `links`: HTML, Markdown, assets 경로
