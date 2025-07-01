# 三此君的数字花园 (sancijun.com)

这是"三此君"的个人品牌中心和数字花园的源代码。本项目旨在成为承载"三此君"个人品牌三大核心支柱的数字枢纽。

**标语: 在路上，写代码，见未来。**

## 品牌核心

本网站是"三此君"品牌理念的数字呈现，其核心源自"此时、此地、此身"的"三此主义"——一个行动者的实践哲学。

*   **此时 (This Time): 投身 AI 变革的浪潮，并在每一个"当下"专注创造。**
    这不仅是关于宏观的 AI 时代，更是关于在旅途的咖啡馆里敲下代码、在星空下构思产品的、全然投入的每一个瞬间。

*   **此地 (This Place): 扎根环国旅程的真实大地，让代码带着泥土的气息。**
    这趟旅程是一个动态的实验室，所有创造都源于真实的需求，旨在解决具体场域的真实问题。

*   **此身 (This Body): 以完整的"创造者"之身，负起全部的责任。**
    从大厂分工明确的"角色"回归，集产品、设计、开发、营销于一身，成为一个主动探索、极致负责的"生命勇士"。

## 技术栈

本项目基于 [Taxonomy](https://github.com/shadcn/taxonomy) 模板进行了深度定制化改造。

*   **框架**: [Next.js 14](https://nextjs.org/) (App Router)
*   **内容管理**: [Contentlayer](https://www.contentlayer.dev/)
*   **数据库**: [PlanetScale](https://planetscale.com/) / [Cloudflare D1](https://developers.cloudflare.com/d1/) (MySQL / SQLite)
*   **UI**: [Tailwind CSS](https://tailwindcss.com/) + [Radix UI](https://www.radix-ui.com/) (由 [shadcn/ui](https://ui.shadcn.com/) 提供)
*   **认证**: [NextAuth.js](https://next-auth.js.org/)
*   **部署**: [Vercel](https://vercel.com) / [Cloudflare Pages](https://pages.cloudflare.com/)

## 项目结构

本项目的核心内容和功能围绕以下目录展开：

### `app/` - 路由与页面

采用 Next.js App Router, 核心路由组如下：

*   `app/(marketing)`: **主站路由组**。包含了网站所有面向公众的核心页面。
    *   `page.tsx`: **首页**，品牌的动态门户。
    *   `explore/`: **探索**，所有思想产出的聚合地，包含文章、笔记、洞察等。
    *   `create/`: **创造**，所有独立开发作品的数字产品陈列室。
    *   `journey/`: **在路上**，数字游民生活方式与环国自驾的专属展区。
    *   `about/`: **关于页面**。

### `content/` - 内容源

所有网站内容均由本地的 Markdown (`.mdx`) 文件驱动，通过 [Contentlayer](https://www.contentlayer.dev/) 解析。

*   `content/explore/`: 存放所有**文章**和**笔记**。
*   `content/create/`: 存放所有**项目**的介绍。
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
*   `NEXT_PUBLIC_DATABASE_URL`: 指向数据库链接。
*   `NEXTAUTH_URL`: 开发环境下通常为 `http://localhost:3000`。
*   `NEXTAUTH_SECRET`: 一个用于加密的随机字符串，可以通过 `openssl rand -base64 32` 生成。

### 4. 初始化数据库

初次运行时，需要初始化数据库并生成 Prisma 客户端。

```bash
pnpm db:push
```

### 5. 启动开发服务器

```bash
pnpm dev
```

现在，您可以在 `http://localhost:3000` 访问您的网站。

## 内容创作流程

1.  **写文章/笔记**: 在 `content/explore/` 目录下创建一个新的 `.mdx` 文件。
2.  **加项目**: 在 `content/create/` 目录下创建一个新的 `.mdx` 文件。
3.  **写文档**: 在 `content/docs/` 目录下创建一个新的子目录和 `.mdx` 文件，然后在 `config/docs.ts` 中配置它的侧边栏导航。

Contentlayer 会在您保存文件时自动重新构建内容，您可以在浏览器中实时看到更改。

## License

Licensed under the [MIT license](https://github.com/sancijun/sancijun.com/blob/main/LICENSE.md).
