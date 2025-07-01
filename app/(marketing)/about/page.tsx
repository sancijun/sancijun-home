import { siteConfig } from "@/config/site"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "关于 - " + siteConfig.name,
  description: "关于三此君以及这个网站的一切。AI、代码与山河：三此君的环国开发之旅。",
}

export default async function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient Background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
        <div className="relative container max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center space-y-8">
            {/* Animated Title */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium backdrop-blur-sm border border-primary/20">
                <span className="animate-pulse">✨</span>
                <span>AI 独立开发者 · 数字游民</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient">
                  三此君
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                AI、代码与山河的交汇点
                <br />
                <span className="text-lg">在路上探索技术与人生的无限可能</span>
              </p>
            </div>

            {/* Three Pillars - Interactive */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 blur transition-all duration-300"></div>
                <div className="relative px-6 py-3 bg-background border rounded-full hover:border-primary/50 transition-all duration-300 group-hover:scale-105">
                  <span className="font-semibold text-primary">此时</span>
                  <span className="text-muted-foreground ml-2">AI革命浪潮</span>
                </div>
              </div>
              
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 blur transition-all duration-300"></div>
                <div className="relative px-6 py-3 bg-background border rounded-full hover:border-primary/50 transition-all duration-300 group-hover:scale-105">
                  <span className="font-semibold text-primary">此地</span>
                  <span className="text-muted-foreground ml-2">环国自驾</span>
                </div>
              </div>
              
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-orange-600 rounded-full opacity-0 group-hover:opacity-100 blur transition-all duration-300"></div>
                <div className="relative px-6 py-3 bg-background border rounded-full hover:border-primary/50 transition-all duration-300 group-hover:scale-105">
                  <span className="font-semibold text-primary">此身</span>
                  <span className="text-muted-foreground ml-2">个体转变</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/5">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* 此时 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative p-8 bg-card border rounded-2xl hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] group-hover:border-primary/30">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6 group-hover:rotate-6 transition-transform duration-300">
                  时
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">此时 · AI革命浪潮</h3>
                <p className="text-muted-foreground leading-relaxed">
                  站在人工智能技术变革的最前沿，深入探索大模型的工作原理，分享AI落地实践的宝贵经验，与时代脉搏同频共振。
                </p>
              </div>
            </div>

            {/* 此地 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative p-8 bg-card border rounded-2xl hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] group-hover:border-primary/30">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6 group-hover:rotate-6 transition-transform duration-300">
                  地
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">此地 · 环国自驾</h3>
                <p className="text-muted-foreground leading-relaxed">
                  驾车穿越中华大地的壮美山河，在路上思考人生与技术，探索数字游民的生活方式，让代码与自然和谐共存。
                </p>
              </div>
            </div>

            {/* 此身 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative p-8 bg-card border rounded-2xl hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] group-hover:border-primary/30">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6 group-hover:rotate-6 transition-transform duration-300">
                  身
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">此身 · 个体转变</h3>
                <p className="text-muted-foreground leading-relaxed">
                  从互联网大厂的螺丝钉蜕变为独立创造者，追求技术理想与个人自由，用代码书写属于自己的人生篇章。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section with Timeline */}
      <section className="py-20">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              我的故事
            </h2>
            <p className="text-xl text-muted-foreground">从大厂程序员到AI独立开发者的蜕变之路</p>
          </div>

          <div className="space-y-12">
            {/* Story Card 1 */}
            <div className="group relative">
              <div className="absolute left-4 top-8 w-0.5 h-full bg-gradient-to-b from-primary to-transparent"></div>
              <div className="flex gap-6 items-start">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  1
                </div>
                <div className="flex-1 bg-card border rounded-xl p-6 group-hover:shadow-lg transition-all duration-300 group-hover:border-primary/30">
                  <h3 className="text-xl font-bold mb-3 text-primary">大厂历程 · 技术积淀</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    在过去的6年里，我在OPPO和Shopee担任高级Java后端开发工程师，从快应用后端负责人到数字银行AI项目负责人，深度参与了大型互联网产品的架构设计和AI技术的商业化落地。
                  </p>
                </div>
              </div>
            </div>

            {/* Story Card 2 */}
            <div className="group relative">
              <div className="absolute left-4 top-8 w-0.5 h-full bg-gradient-to-b from-primary to-transparent"></div>
              <div className="flex gap-6 items-start">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  2
                </div>
                <div className="flex-1 bg-card border rounded-xl p-6 group-hover:shadow-lg transition-all duration-300 group-hover:border-primary/30">
                  <h3 className="text-xl font-bold mb-3 text-primary">觉醒时刻 · 内心召唤</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    大厂的快节奏让我开始思考什么是真正有意义的创造。我渴望用技术解决真实问题，用代码表达内心想法，用旅行拓宽视野边界。于是决定离开舒适圈，成为独立开发者。
                  </p>
                </div>
              </div>
            </div>

            {/* Story Card 3 */}
            <div className="group relative">
              <div className="flex gap-6 items-start">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  3
                </div>
                <div className="flex-1 bg-card border rounded-xl p-6 group-hover:shadow-lg transition-all duration-300 group-hover:border-primary/30">
                  <h3 className="text-xl font-bold mb-3 text-primary">创业启程 · 筑梦未来</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    现在，我正与朋友们开发AI智能硬件项目——面向3-8岁儿童的启蒙拍学机，鼓励孩子们探索世界。同时准备环国自驾之旅，在路上持续创作、分享和建设。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Projects */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/5">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              技能与作品
            </h2>
            <p className="text-xl text-muted-foreground">用代码构建未来，用作品证明实力</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Skills */}
            <div className="group">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-sm">⚡</span>
                技术栈
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['Java', 'Spring Boot', 'AI/ML', '大模型', 'LangChain', 'TypeScript', 'Next.js', '产品设计'].map((skill, index) => (
                  <div 
                    key={skill}
                    className="group/skill relative overflow-hidden"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 translate-x-[-100%] group-hover/skill:translate-x-0 transition-transform duration-500"></div>
                    <div className="relative px-4 py-3 bg-card border rounded-lg text-center hover:border-primary/50 transition-all duration-300 group-hover/skill:scale-105">
                      <span className="font-medium text-sm">{skill}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="group">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-sm">🚀</span>
                代表作品
              </h3>
              <div className="space-y-4">
                {[
                  { name: '微信读书工具箱', type: '浏览器插件', gradient: 'from-blue-500 to-cyan-500' },
                  { name: '飞书导出助手', type: '浏览器插件', gradient: 'from-green-500 to-emerald-500' },
                  { name: '表情包助手', type: 'uTools插件', gradient: 'from-purple-500 to-violet-500' },
                  { name: 'Easy Image Uploader', type: 'Obsidian插件', gradient: 'from-orange-500 to-red-500' },
                  { name: '书见·AI智能创作工具', type: 'Web应用', gradient: 'from-pink-500 to-rose-500' }
                ].map((project, index) => (
                  <div 
                    key={project.name}
                    className="group/project flex items-center gap-4 p-4 bg-card border rounded-lg hover:shadow-lg transition-all duration-300 hover:border-primary/30 hover:scale-[1.02]"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${project.gradient} group-hover/project:scale-125 transition-transform duration-300`}></div>
                    <div className="flex-1">
                      <div className="font-medium">{project.name}</div>
                      <div className="text-sm text-muted-foreground">{project.type}</div>
                    </div>
                    <div className="opacity-0 group-hover/project:opacity-100 transition-opacity duration-300">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Projects - Featured */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              当下正在做什么
            </h2>
            <p className="text-xl text-muted-foreground">用AI改变世界，用旅行丰富人生</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* AI Hardware Startup */}
            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative p-8 bg-card border rounded-2xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:border-primary/30">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform duration-500">
                    🚀
                  </div>
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">AI智能硬件创业</h3>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  正在开发面向3-8岁儿童的AI启蒙拍学机，结合先进的计算机视觉和大语言模型技术，鼓励孩子们通过拍照来探索和理解世界的奥秘。
                </p>
                <div className="flex flex-wrap gap-2">
                  {['儿童教育', 'AI + 硬件', '计算机视觉', '产品设计'].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Travel Plan */}
            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative p-8 bg-card border rounded-2xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:border-primary/30">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform duration-500">
                    🛣️
                  </div>
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">环国自驾计划</h3>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  即将开启的环国自驾之旅，将在祖国的大好河山中持续创作AI相关内容，分享数字游民的生活方式，探索中国各地的创新生态和文化底蕴。
                </p>
                <div className="flex flex-wrap gap-2">
                  {['数字游民', '自驾旅行', '内容创作', '文化探索'].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Focus */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/5">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              内容方向
            </h2>
            <p className="text-xl text-muted-foreground">分享有价值的技术洞察与人生思考</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🧠', title: 'AI技术原理与实践', desc: '大模型原理、微调技术、AI工程化实践', gradient: 'from-blue-500 to-cyan-500' },
              { icon: '🛠️', title: 'AI效率工具分享', desc: '编程工具、工作流优化、生产力提升', gradient: 'from-green-500 to-emerald-500' },
              { icon: '📱', title: '独立开发经验', desc: '产品构建、用户反馈、变现思考', gradient: 'from-purple-500 to-violet-500' },
              { icon: '🌍', title: '环国自驾见闻', desc: '数字游民生活、远程工作、地域文化', gradient: 'from-orange-500 to-red-500' },
              { icon: '💡', title: '创业思考', desc: 'AI硬件创业、儿童教育、商业模式', gradient: 'from-pink-500 to-rose-500' },
              { icon: '🎯', title: '职业转型', desc: '从大厂到独立、自由职业的经验分享', gradient: 'from-indigo-500 to-purple-500' }
            ].map((item, index) => (
              <div 
                key={item.title}
                className="group relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient.replace('to-', 'to-')}/10 opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
                <div className="relative p-6 bg-card border rounded-xl group-hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02] group-hover:border-primary/30">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center text-white text-xl group-hover:rotate-6 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5"></div>
        <div className="relative container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            让我们连接
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            如果你对AI技术、独立开发或数字游民生活感兴趣，欢迎与我一起探索未知，创造可能。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:scale-105 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center gap-2">
                <span>订阅我的内容</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            
            <button className="group px-8 py-4 border border-primary/30 rounded-xl font-medium hover:bg-primary/5 transition-all duration-300 hover:scale-105">
              <span className="flex items-center gap-2">
                <span>查看我的作品</span>
                <svg className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            </button>
          </div>
          
          <div className="text-center space-y-2 text-muted-foreground">
            <p className="font-medium">三此君 · 此时，此地，此身</p>
            <p className="text-sm">AI、代码与山河的交汇点</p>
          </div>
        </div>
      </section>
    </div>
  )
} 