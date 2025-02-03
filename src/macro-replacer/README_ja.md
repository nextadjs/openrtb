# OpenRTB/Auction マクロリプレーサー

OpenRTB 3.0 と Auction 2.x のイベントトラッキング URL 用マクロ置換を処理する TypeScript ライブラリです。

## 特徴

- OpenRTB 3.0 と Auction 2.x 両方のマクロ形式に対応
- バージョン固有のマクロ処理
- undefined/null 値の安全な処理
- 型安全なコンテキスト管理

## 使用方法

```typescript
import { MacroReplacer } from "@nextad/openrtb/macro-replacer";

// 初期コンテキストを指定してインスタンスを作成
const replacer = new MacroReplacer({
  id: "auction123",
  price: 10.5,
  currency: "USD",
});

// 文字列内のマクロを置換
const result = replacer.replace(
  "オークション ${OPENRTB_ID}: ${OPENRTB_PRICE} ${OPENRTB_CURRENCY}"
);
// 出力: "オークション auction123: 10.5 USD"

// コンテキスト値の更新
replacer.updateContext({ price: 15.0 });

// サポートされているマクロの一覧を取得
const macros = replacer.getSupportedMacros();
```

## バージョン固有の使用方法

OpenRTB 3.0 または Auction 2.x のいずれかのマクロのみをサポートするバージョン固有のインスタンスを作成できます：

```typescript
// OpenRTB 3.0のみ
const openrtbReplacer = new MacroReplacer({}, "3");

// Auction 2.xのみ
const auctionReplacer = new MacroReplacer({}, "2");
```

## サポートされているマクロ

### 共通マクロ（両バージョン）

- `${OPENRTB_ID}` / `${AUCTION_ID}`: オークション識別子
- `${OPENRTB_BID_ID}` / `${AUCTION_BID_ID}`: 入札識別子
- `${OPENRTB_ITEM_ID}` / `${AUCTION_IMP_ID}`: アイテム/インプレッション識別子
- `${OPENRTB_SEAT_ID}` / `${AUCTION_SEAT_ID}`: シート識別子
- `${OPENRTB_PRICE}` / `${AUCTION_PRICE}`: 落札価格
- `${OPENRTB_CURRENCY}` / `${AUCTION_CURRENCY}`: 通貨
- `${OPENRTB_MBR}` / `${AUCTION_MBR}`: マーケットビッド比率
- `${OPENRTB_LOSS}` / `${AUCTION_LOSS}`: 失注理由コード
- `${OPENRTB_MIN_TO_WIN}` / `${AUCTION_MIN_TO_WIN}`: 落札に必要な最低価格

### OpenRTB 3.0 固有

- `${OPENRTB_MEDIA_ID}`: メディア識別子
- `${OPENRTB_ITEM_QTY}`: アイテム数量

### Auction 2.x 固有

- `${AUCTION_AD_ID}`: 広告識別子
- `${AUCTION_MULTIPLIER}`: 価格乗数
- `${AUCTION_IMP_TS}`: インプレッションタイムスタンプ

## エラー処理

このライブラリは、存在しないコンテキスト値を空文字列として安全に処理します。また、無効なマクロは出力文字列内で変更されずにそのまま残ります。

## TypeScript サポート

このライブラリは TypeScript で書かれており、型定義を同梱しています。コンテキスト値は`MacroContext`インターフェースを通じて型安全に管理されます。

## ライセンス

MIT ライセンス - 詳細は[LICENSE.md](LICENSE.md)を参照してください。
