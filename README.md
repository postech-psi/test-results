# PSI Test Results

PSI 시험 결과 공개 및 정리용 저장소입니다.

- 웹페이지 바로가기: [https://postech-psi.github.io/test-results/](https://postech-psi.github.io/test-results/)
- 테스트 카탈로그: [data/tests.json](./data/tests.json)
- 작성 가이드: [docs/repo-structure.md](./docs/repo-structure.md)
- 템플릿: [templates/test-entry.md](./templates/test-entry.md)

## 현재 공개된 시험

- 2026-04-03 연소 시험
  - 웹페이지: [tests/2026-04-03/index.html](./tests/2026-04-03/index.html)
  - Markdown: [tests/2026-04-03/index.md](./tests/2026-04-03/index.md)

## 확장 방식

이 저장소는 GitHub Pages 메인 웹페이지를 중심으로, 앞으로 시험 결과가 늘어나도 한 곳만 수정하면 되도록 구성했습니다.

1. `tests/YYYY-MM-DD/` 아래에 결과 페이지와 에셋을 추가합니다.
2. `data/tests.json` 에 새 시험 메타데이터를 한 건 추가합니다.
3. 루트 홈페이지는 `data/tests.json` 을 읽어 자동으로 목록을 렌더링합니다.

자세한 규칙은 [docs/repo-structure.md](./docs/repo-structure.md) 에 정리되어 있습니다.
