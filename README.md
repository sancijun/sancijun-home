# 三此君的数字花园 (sancijun.com)

这是"三此君"的个人品牌中心和数字花园的源代码。本项目基于 [Taxonomy](https://github.com/shadcn/taxonomy) 模板进行了深度定制化改造，以完全服务于"三此君"的个人品牌战略。

## 品牌核心

本网站旨在承载"三此君"的三大核心支柱：

*   **此时 (This Time):** AI 革命的浪潮。分享最前沿的 AI 技术、大模型原理与落地经验。
*   **此地 (This Place):** 环游中国的旅程。记录作为数字游民的所见、所闻、所思。
*   **此身 (This Body):** 个体的转变之旅。分享从大厂到独立创造者的经验与感悟。

## 技术栈

*   **框架**: [Next.js 13](https://nextjs.org/) (App Router)
*   **内容管理**: [Contentlayer](https://www.contentlayer.dev/)
*   **数据库**: [Cloudflare D1](https://developers.cloudflare.com/d1/) (SQLite)
*   **UI**: [Tailwind CSS](https://tailwindcss.com/) + [Radix UI](https://www.radix-ui.com/) (由 [shadcn/ui](https://ui.shadcn.com/) 提供)
*   **认证**: [NextAuth.js](https://next-auth.js.org/)
*   **部署**: Vercel / Cloudflare Pages

## 项目结构

本项目的核心内容和功能围绕以下目录展开：

### `app/` - 路由与页面

*   `app/(marketing)`: **主站路由组**。包含了网站所有面向公众的核心页面。
    *   `page.tsx`: **首页**，品牌的动态门户。
    *   `explore/`: **探索页面**，所有文章、笔记的聚合地，带有分类和格式筛选功能。
    *   `create/`: **创造页面**，展示所有独立开发的项目。
    *   `journey/`: **在路上页面**，展示旅行日志的专属展区。
    *   `about/`: **关于页面**。
*   `app/(docs)`: **文档路由组**。用于渲染产品使用指南等结构化文档。
    *   `docs/`: 渲染 `/docs/...` 路径下的所有文档，拥有独立的侧边栏布局。

### `content/` - 内容源

所有网站内容均由本地的 Markdown (`.mdx`) 文件驱动。

*   `content/explore/`: 存放所有**文章**和**笔记**。每篇文章的 frontmatter 中需定义 `category` 和 `format`。
*   `content/create/`: 存放所有**项目**的介绍。可选择性地通过 `featured: true` 在首页推荐，通过 `docs: "/path/to/docs"` 关联文档。
*   `content/docs/`: 存放所有**产品文档**。

### `config/` - 站点配置

*   `config/site.ts`: 定义网站的全局信息，如名称、描述、社交链接。
*   `config/marketing.ts`: 定义主站导航栏的链接。
*   `config/docs.ts`: 定义文档区域的侧边栏导航结构。

## 本地开发

### 1. 环境准备

本项目使用 `pnpm` 作为包管理器。请先确保已安装 `pnpm`:

```bash
npm install -g pnpm
```

### 2. 安装依赖

克隆项目后，在根目录运行：

```bash
pnpm install
```

### 3. 配置环境变量

复制 `.env.example` 文件为 `.env.local`，并填入必要的环境变量。

```bash
cp .env.example .env.local
```

至少需要配置以下变量：

*   `DATABASE_URL`: 指向本地 SQLite 数据库文件的路径，例如 `file:./prisma/dev.db`。
*   `NEXTAUTH_URL`: 开发环境下通常为 `http://localhost:3000`。
*   `NEXTAUTH_SECRET`: 一个用于加密的随机字符串，可以通过 `openssl rand -base64 32` 生成。

### 4. 初始化数据库

初次运行时，需要初始化本地数据库并生成 Prisma 客户端。

```bash
pnpm prisma migrate dev
pnpm prisma generate
```

### 5. 启动开发服务器

```bash
pnpm dev
```

现在，您可以在 `http://localhost:3000` 访问您的网站。

## 内容创作流程

1.  **写文章**: 在 `content/explore/` 目录下创建一个新的 `.mdx` 文件。在 frontmatter 中填写 `title`, `description`, `date`, `category` 等字段。
2.  **加项目**: 在 `content/create/` 目录下创建一个新的 `.mdx` 文件。填写 `title`, `description`, `date`, `url` 等字段。
3.  **写文档**: 在 `content/docs/` 目录下创建一个新的子目录和 `.mdx` 文件，然后在 `config/docs.ts` 中配置它的侧边栏导航。

Contentlayer 会在您保存文件时自动重新构建内容，您可以在浏览器中实时看到更改。

## License

Licensed under the [MIT license](https://github.com/shadcn/taxonomy/blob/main/LICENSE.md).
