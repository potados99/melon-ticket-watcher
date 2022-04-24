# melon-ticket-watcher

멜론티켓 취소표 watcher

## 사용법

```bash
$ npm install
```

```bash
$ npm start -- \
--product-id [멜론티켓 상품 ID] \
--schedule-no [(optional)공연 시간 ID]
--slack-webhook-url [알림 받을 슬랙 웹훅 URL] \
--poll-interval-millis [폴링 주기 밀리초]
```
