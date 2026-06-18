# LoiLoDark
# ロイロノートのダークモード用ブラウザ拡張機能

夜間や長時間のロイロの使用による健康への影響を削減する**非公式**アドオン。  
Manifest V3を読み込むことのできるChromium系ブラウザに対応しています。  
ロイロの規約を守ってお使いください。  

**注意:本ツールは非公式であり、株式会社LoiLo および「ロイロノート・スクール」と公式な関係はございません。**  
**Note: This tool is unofficial and has no official relationship with LoiLo Inc. or "LoiLoNote School."**

公開にさしあたり、昨今「技術者倫理」が話題となったこともあるために、  
事前に株式会社ロイロへ問い合わせをいたしました。  
ご返信をいただけました。要点としては  

> - 第三者ツールについて個別に使用／配布の許諾を出す形は取っていない
> - 配布・公開はご本人の判断と責任のもと
> - 公式と誤認されない表記とすること
> - 以上は一般的な留意点で、配布・公開の判断は本人に任せる

とのことです。

> また、いただいた「公式にダークモードを実装してほしい」というご要望は、開発チームへ正式に共有させていただきます。

ともご返信いただけました。  
よって、本アドオンは公式な実装を確認し次第、サポートを終了します。  

<img width="305" height="336" alt="image" src="https://github.com/user-attachments/assets/bbf28581-8c71-44fa-b041-eed4c74bd6b2" />
<img width="304" height="335" alt="image" src="https://github.com/user-attachments/assets/3ff3b775-1ce4-4280-b9dd-efc53e9f8382" />

**1.本アドオンの利用は自己責任の下、非公式であることを理解した上でご利用ください。**  
**2.本アドオンに関するお問い合わせを、株式会社LoiLoまたはその関係者にしないでください。**  
**3.バグや脆弱性を発見された方は、issuesまでお願いします。**  
**4.本アドオンを利用したことによる一切の損害について製作者は保証しかねます。**  

## ファイル構成

```
loilodark/
├── manifest.json      拡張機能の設定（Manifest V3）
├── background.js      いわゆるsurvice-worker
├── content.js         本体
├── dark-mode.css      ダークモード版のスタイル本体
└── icons/
    ├── icon16.png / icon48.png / icon128.png        OFF状態
    └── icon16-on.png / icon48-on.png / icon128-on.png  ON状態
```

## インストール方法
対応しているのは、Chrome / Edge / Brave 等、Chromiumベースのブラウザです。

1. `chrome://extensions`を開く
2. 右上の「デベロッパーモード」をONにする
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. `loilodark` フォルダを選択
5. ツールバーに月のアイコンが表示されればインストール完了

## 使い方

- ツールバーのアイコンをクリックするたびに ON / OFF が切り替わります。
- ON のときアイコンは青色になり、バッジに「ON」と表示されます。
