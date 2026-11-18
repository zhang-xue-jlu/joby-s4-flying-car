# Joby S4：城市空中出租车的技术可行性与商业边界

飞行汽车技术基础课程作业 · 案例 02。纯静态网页，根目录 `index.html`，无构建步骤、无外部依赖，可直接部署到 GitHub Pages。

## 本地预览

页面顶部预览见 `preview.png`。直接双击 `index.html` 即可查看完整交互版。也可以在当前目录启动一个静态服务器：

```powershell
python -m http.server 8080
```

然后访问 `http://localhost:8080/`。

## 部署到 GitHub Pages

1. 在 GitHub 新建 **Public** 仓库（例如 `flying-vehicle-joby-s4`）。
2. 把本目录全部文件上传到仓库根目录，确认 `index.html` 在根目录。
3. 仓库 **Settings → Pages → Build and deployment**：
   - Source: `Deploy from a branch`
   - Branch: `main`，目录选 `/ (root)`
4. 保存后等待 1–2 分钟，访问 `https://<你的用户名>.github.io/<仓库名>/`。
5. 把该链接填入课程作业收集页的右侧链接。

> 如果使用命令行：
>
> ```bash
> git init
> git add .
> git commit -m "Add Joby S4 case study"
> git branch -M main
> git remote add origin https://github.com/<你的用户名>/<仓库名>.git
> git push -u origin main
> ```

## 页面结构

- `index.html` — 全部正文、表格、SVG 图示与语义结构
- `assets/css/style.css` — 版式、深色模式、响应式、打印样式
- `assets/js/main.js` — 阅读进度、章节目录、主题切换、单城市场模型
- `assets/img/joby-s4-hero.svg` — 自绘六倾转旋翼示意图
- `assets/img/favicon.svg` — 站点图标

## 内容特点

- **证据分级**：A 官方/监管、B 可交叉验证、C 公司宣称、D 作者估算。
- **三层拆解**：技术演示 / 适航取证 / 商业运行，避免把“能飞”写成“已商业化”。
- **可调市场模型**：航线数、班次、座位、载客率、票价、运营天数均可拖动，实时输出收入、运力、单座成本与毛利。
- **竞品对比**：Joby S4、Archer Midnight、EHang EH216-S、BETA ALIA、AutoFlight V2000EM、Wisk Gen 6。
- **打印/PDF**：页面右上角打印按钮，已适配 A4 打印样式。

## 需要你替换的内容

- 页脚与“引用建议”中的姓名、学号、仓库链接（如需）。
- 如果老师要求封面含姓名/日期，可在 `index.html` 的 hero 区域增加一行作者信息。
- 提交前请核对 2026-11-18 之后的认证与运营状态，尤其是 FAA TC、迪拜首客与 Joby 季度披露。

## 数据与引用

关键数据来自 Joby 官方技术页、2026 Q3 业绩公告、Joby/Uber 公告、FAA、EASA、EHang、BETA、AutoFlight、Archer、Wisk 等公开页面。完整列表见页面第 11 节“参考文献”。

本页为课程作业，不构成投资建议。公司名称与商标归各自所有者。
