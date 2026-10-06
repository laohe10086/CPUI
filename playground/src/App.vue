<template>
  <CpThemeProvider :theme="currentTheme">
    <CpGridLayer v-if="showGrid" :pattern="gridPattern" :opacity="0.6" />
    <CpBackground :variant="bgVariant" />
    <div class="docs">
      <!-- ===== TOP BAR ===== -->
      <header class="docs__topbar">
        <div class="docs__topbar-left">
          <CpLogo text="CpUI" size="sm" />
          <span class="docs__topbar-sep">/</span>
          <span class="docs__topbar-page">{{ currentCategory.label }}</span>
        </div>
        <div class="docs__topbar-right">
          <a class="docs__link" href="https://github.com/laohe10086/CPUI" target="_blank" rel="noopener">GitHub</a>
          <a class="docs__link" href="https://www.npmjs.com/package/@yuanfangmao/cp-ui" target="_blank" rel="noopener">npm</a>
          <select v-model="bgVariant" class="docs__ctrl">
            <option value="neon">霓虹</option>
            <option value="mesh">网格</option>
            <option value="glow">光晕</option>
            <option value="minimal">极简</option>
          </select>
          <label class="docs__toggle">
            <input type="checkbox" v-model="showGrid" />
            <span>{{ showGrid ? '网格开' : '网格关' }}</span>
          </label>
          <select v-model="currentTheme" class="docs__ctrl">
            <option value="sterile-cyber">无菌赛博</option>
            <option value="cyberpunk">赛博朋克</option>
            <option value="neon-noir">霓虹黑</option>
            <option value="blueprint">蓝图</option>
            <option value="brutal">终端粗野</option>
            <option value="modern">现代科技</option>
            <option value="cyber-modern">赛博现代</option>
            <option value="sterile-dark">无菌暗色</option>
            <option value="sterile-light">无菌亮色</option>
          </select>
        </div>
      </header>

      <div class="docs__layout">
        <!-- ===== SIDEBAR ===== -->
        <aside class="docs__sidebar">
          <nav class="docs__nav">
            <template v-for="cat in categories" :key="cat.key">
              <div class="docs__nav-group">{{ cat.label }}</div>
              <a
                v-for="item in cat.items"
                :key="item.key"
                class="docs__nav-item"
                :class="{ 'docs__nav-item--active': activeItem === item.key }"
                @click="activeItem = item.key"
              >
                {{ item.label }}
              </a>
            </template>
          </nav>
        </aside>

        <!-- ===== CONTENT ===== -->
        <main class="docs__content">
          <!-- ==================== 基础 Basic ==================== -->

          <!-- ==================== 快速开始 ==================== -->
          <template v-if="activeItem === 'quickstart'">
            <DocsTitle title="快速开始" desc="@yuanfangmao/cp-ui 是一个 Vue 3 赛博朋克风格组件库，内置 7 种主题，支持全局引入与按需引入。" />

            <DemoBlock title="1. 安装" description="使用 npm 或 pnpm 安装">
              <div class="quickstart-install">
                <code class="quickstart-cmd">npm install @yuanfangmao/cp-ui</code>
                <button class="quickstart-cmd-copy" @click="copyInstall">{{ copyInstallText }}</button>
              </div>
            </DemoBlock>

            <DemoBlock title="2. 全局引入（推荐）" description="在 main.ts 中一次性引入所有组件和样式">
              <DemoCode :code="globalImportCode" />
            </DemoBlock>

            <DemoBlock title="3. 按需引入" description="只引入需要的组件，配合 Tree Shaking">
              <DemoCode :code="treeShakingCode" />
            </DemoBlock>

            <DemoBlock title="4. 使用示例" description="在模板中使用组件，并包裹 CpThemeProvider 切换主题">
              <div class="quickstart-preview">
                <CpThemeProvider theme="cyberpunk">
                  <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;padding:8px;">
                    <CyberButton variant="primary">Primary</CyberButton>
                    <CyberButton variant="secondary">Secondary</CyberButton>
                    <CyberTag>标签</CyberTag>
                    <CyberBadge text="42" />
                  </div>
                </CpThemeProvider>
              </div>
              <DemoCode :code="usageCode" />
            </DemoBlock>

            <DemoBlock title="5. 主题切换" description="CpThemeProvider 支持 7 种主题：cyberpunk / sterile-cyber / neon-noir / blueprint / brutal / sterile-dark / sterile-light">
              <DemoCode :code="themeCode" />
            </DemoBlock>

            <DemoBlock title="6. 相关链接" description="源码与包管理页面">
              <div class="quickstart-links">
                <a class="quickstart-link" href="https://github.com/laohe10086/CPUI" target="_blank" rel="noopener">
                  <CyberButton variant="secondary">🐙 GitHub 仓库</CyberButton>
                </a>
                <a class="quickstart-link" href="https://www.npmjs.com/package/@yuanfangmao/cp-ui" target="_blank" rel="noopener">
                  <CyberButton variant="primary">📦 npm 包页</CyberButton>
                </a>
              </div>
            </DemoBlock>
          </template>

          <!-- ==================== 主题展示 ==================== -->

          <template v-if="activeItem === 'theme-showcase'">
            <DocsTitle title="九主题对比" desc="同一组件在 9 种主题下的视觉差异。每个区块独立包裹 CpThemeProvider，使用对应风格的组件。" />
            <div style="display:flex;flex-direction:column;gap:20px">

              <!-- 赛博朋克 -->
              <CpThemeProvider theme="cyberpunk">
                <div class="theme-card">
                  <div class="theme-card__header">
                    <span class="theme-card__name">赛博朋克</span>
                    <code class="theme-card__value">cyberpunk</code>
                  </div>
                  <div class="theme-card__body">
                    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                      <CyberButton variant="primary">Primary</CyberButton>
                      <CyberButton variant="secondary">Secondary</CyberButton>
                      <CyberButton variant="danger">Danger</CyberButton>
                    </div>
                    <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap;align-items:center">
                      <CyberTag>Tag</CyberTag>
                      <CyberBadge text="42" />
                      <CyberBracketLabel text="LABEL" />
                      <CpStatusLed status="online" :pulse="true" />
                      <CpDigitalClock :show-seconds="false" :glitch="false" />
                    </div>
                    <div style="display:flex;gap:12px;margin-top:12px;flex-wrap:wrap">
                      <CyberCard style="width:180px">
                        <div style="padding:12px;font-size:12px">Card 内容</div>
                      </CyberCard>
                      <CyberInput v-model="themeInputVal" placeholder="输入框..." style="flex:1;min-width:160px" />
                    </div>
                    <div style="margin-top:12px">
                      <CyberProgressBar :percentage="72" />
                    </div>
                  </div>
                </div>
              </CpThemeProvider>

              <!-- 无菌赛博 -->
              <CpThemeProvider theme="sterile-cyber">
                <div class="theme-card">
                  <div class="theme-card__header">
                    <span class="theme-card__name">无菌赛博</span>
                    <code class="theme-card__value">sterile-cyber</code>
                  </div>
                  <div class="theme-card__body">
                    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                      <SterileCyberButton variant="primary">Primary</SterileCyberButton>
                      <SterileCyberButton variant="secondary">Secondary</SterileCyberButton>
                      <SterileCyberButton variant="danger">Danger</SterileCyberButton>
                    </div>
                    <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap;align-items:center">
                      <SterileCyberTag>Tag</SterileCyberTag>
                      <SterileCyberBadge text="42" />
                      <SterileCyberBracketLabel text="LABEL" />
                      <CpStatusLed status="online" :pulse="true" />
                      <CpDigitalClock :show-seconds="false" :glitch="false" />
                    </div>
                    <div style="display:flex;gap:12px;margin-top:12px;flex-wrap:wrap">
                      <SterileCyberCard style="width:180px">
                        <div style="padding:12px;font-size:12px">Card 内容</div>
                      </SterileCyberCard>
                      <SterileCyberInput v-model="themeInputVal" placeholder="输入框..." style="flex:1;min-width:160px" />
                    </div>
                    <div style="margin-top:12px">
                      <SterileCyberProgressBar :percentage="72" />
                    </div>
                  </div>
                </div>
              </CpThemeProvider>

              <!-- 霓虹黑 -->
              <CpThemeProvider theme="neon-noir">
                <div class="theme-card">
                  <div class="theme-card__header">
                    <span class="theme-card__name">霓虹黑</span>
                    <code class="theme-card__value">neon-noir</code>
                  </div>
                  <div class="theme-card__body">
                    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                      <CyberButton variant="primary">Primary</CyberButton>
                      <CyberButton variant="secondary">Secondary</CyberButton>
                      <CyberButton variant="danger">Danger</CyberButton>
                    </div>
                    <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap;align-items:center">
                      <CyberTag>Tag</CyberTag>
                      <CyberBadge text="42" />
                      <CyberBracketLabel text="LABEL" />
                      <CpStatusLed status="online" :pulse="true" />
                      <CpDigitalClock :show-seconds="false" :glitch="false" />
                    </div>
                    <div style="display:flex;gap:12px;margin-top:12px;flex-wrap:wrap">
                      <CyberCard style="width:180px">
                        <div style="padding:12px;font-size:12px">Card 内容</div>
                      </CyberCard>
                      <CyberInput v-model="themeInputVal" placeholder="输入框..." style="flex:1;min-width:160px" />
                    </div>
                    <div style="margin-top:12px">
                      <CyberProgressBar :percentage="72" />
                    </div>
                  </div>
                </div>
              </CpThemeProvider>

              <!-- 蓝图 -->
              <CpThemeProvider theme="blueprint">
                <div class="theme-card">
                  <div class="theme-card__header">
                    <span class="theme-card__name">蓝图</span>
                    <code class="theme-card__value">blueprint</code>
                  </div>
                  <div class="theme-card__body">
                    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                      <BlueprintButton variant="primary">Primary</BlueprintButton>
                      <BlueprintButton variant="secondary">Secondary</BlueprintButton>
                      <BlueprintButton variant="danger">Danger</BlueprintButton>
                    </div>
                    <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap;align-items:center">
                      <BlueprintTag>Tag</BlueprintTag>
                      <BlueprintBadge text="42" />
                      <BlueprintBracketLabel text="LABEL" />
                      <CpStatusLed status="online" :pulse="true" />
                      <CpDigitalClock :show-seconds="false" :glitch="false" />
                    </div>
                    <div style="display:flex;gap:12px;margin-top:12px;flex-wrap:wrap">
                      <BlueprintCard title="MODULE" style="width:200px">
                        <div style="font-size:12px">Card 内容</div>
                      </BlueprintCard>
                      <BlueprintInput v-model="themeInputVal" placeholder="尺寸标注..." style="flex:1;min-width:160px" />
                    </div>
                    <div style="margin-top:12px">
                      <BlueprintProgressBar :value="72" :animated="true" />
                    </div>
                  </div>
                </div>
              </CpThemeProvider>

              <!-- 终端粗野 -->
              <CpThemeProvider theme="brutal">
                <div class="theme-card">
                  <div class="theme-card__header">
                    <span class="theme-card__name">终端粗野</span>
                    <code class="theme-card__value">brutal</code>
                  </div>
                  <div class="theme-card__body">
                    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                      <BrutalButton variant="primary">Primary</BrutalButton>
                      <BrutalButton variant="secondary">Secondary</BrutalButton>
                      <BrutalButton variant="danger">Danger</BrutalButton>
                    </div>
                    <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap;align-items:center">
                      <BrutalTag>Tag</BrutalTag>
                      <BrutalBadge text="42" />
                      <BrutalBracketLabel text="LABEL" />
                      <CpStatusLed status="online" :pulse="true" />
                      <CpDigitalClock :show-seconds="false" :glitch="false" />
                    </div>
                    <div style="display:flex;gap:12px;margin-top:12px;flex-wrap:wrap">
                      <BrutalCard title="module" style="width:180px">
                        <div style="font-size:12px">Card 内容</div>
                      </BrutalCard>
                      <BrutalInput v-model="themeInputVal" placeholder="输入命令..." style="flex:1;min-width:160px" />
                    </div>
                    <div style="margin-top:12px">
                      <BrutalProgressBar :value="72" />
                    </div>
                  </div>
                </div>
              </CpThemeProvider>

              <!-- 无菌暗色 -->
              <CpThemeProvider theme="sterile-dark">
                <div class="theme-card">
                  <div class="theme-card__header">
                    <span class="theme-card__name">无菌暗色</span>
                    <code class="theme-card__value">sterile-dark</code>
                  </div>
                  <div class="theme-card__body">
                    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                      <SterileButton variant="primary">Primary</SterileButton>
                      <SterileButton variant="secondary">Secondary</SterileButton>
                      <SterileButton variant="danger">Danger</SterileButton>
                    </div>
                    <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap;align-items:center">
                      <SterileTag>Tag</SterileTag>
                      <SterileBadge text="42" />
                      <SterileBracketLabel text="LABEL" />
                      <CpStatusLed status="online" :pulse="true" />
                      <CpDigitalClock :show-seconds="false" :glitch="false" />
                    </div>
                    <div style="display:flex;gap:12px;margin-top:12px;flex-wrap:wrap">
                      <SterileCard style="width:180px">
                        <div style="padding:12px;font-size:12px">Card 内容</div>
                      </SterileCard>
                      <SterileInput v-model="themeInputVal" placeholder="输入框..." style="flex:1;min-width:160px" />
                    </div>
                    <div style="margin-top:12px">
                      <SterileProgressBar :percentage="72" />
                    </div>
                  </div>
                </div>
              </CpThemeProvider>

              <!-- 无菌亮色 -->
              <CpThemeProvider theme="sterile-light">
                <div class="theme-card">
                  <div class="theme-card__header">
                    <span class="theme-card__name">无菌亮色</span>
                    <code class="theme-card__value">sterile-light</code>
                  </div>
                  <div class="theme-card__body">
                    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                      <SterileButton variant="primary">Primary</SterileButton>
                      <SterileButton variant="secondary">Secondary</SterileButton>
                      <SterileButton variant="danger">Danger</SterileButton>
                    </div>
                    <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap;align-items:center">
                      <SterileTag>Tag</SterileTag>
                      <SterileBadge text="42" />
                      <SterileBracketLabel text="LABEL" />
                      <CpStatusLed status="online" :pulse="true" />
                      <CpDigitalClock :show-seconds="false" :glitch="false" />
                    </div>
                    <div style="display:flex;gap:12px;margin-top:12px;flex-wrap:wrap">
                      <SterileCard style="width:180px">
                        <div style="padding:12px;font-size:12px">Card 内容</div>
                      </SterileCard>
                      <SterileInput v-model="themeInputVal" placeholder="输入框..." style="flex:1;min-width:160px" />
                    </div>
                    <div style="margin-top:12px">
                      <SterileProgressBar :percentage="72" />
                    </div>
                  </div>
                </div>
              </CpThemeProvider>

              <!-- 现代科技 -->
              <CpThemeProvider theme="modern">
                <div class="theme-card">
                  <div class="theme-card__header">
                    <span class="theme-card__name">现代科技</span>
                    <code class="theme-card__value">modern</code>
                  </div>
                  <div class="theme-card__body">
                    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                      <ModernButton variant="primary">Primary</ModernButton>
                      <ModernButton variant="secondary">Secondary</ModernButton>
                      <ModernButton variant="danger">Danger</ModernButton>
                    </div>
                    <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap;align-items:center">
                      <ModernTag>TAG</ModernTag>
                      <ModernBadge>42</ModernBadge>
                      <ModernBracketLabel>LABEL</ModernBracketLabel>
                      <CpStatusLed status="online" :pulse="true" />
                      <CpDigitalClock :show-seconds="false" :glitch="false" />
                    </div>
                    <div style="display:flex;gap:12px;margin-top:12px;flex-wrap:wrap">
                      <ModernCard title="Modern Card" style="width:200px">
                        <div style="font-size:12px">Card 内容</div>
                      </ModernCard>
                      <ModernInput v-model="themeInputVal" placeholder="输入内容..." style="flex:1;min-width:160px" />
                    </div>
                    <div style="margin-top:12px">
                      <ModernProgressBar :value="72" />
                    </div>
                  </div>
                </div>
              </CpThemeProvider>

              <!-- 赛博现代 -->
              <CpThemeProvider theme="cyber-modern">
                <div class="theme-card">
                  <div class="theme-card__header">
                    <span class="theme-card__name">赛博现代</span>
                    <code class="theme-card__value">cyber-modern</code>
                  </div>
                  <div class="theme-card__body">
                    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                      <CyberModernButton variant="primary">Primary</CyberModernButton>
                      <CyberModernButton variant="secondary">Secondary</CyberModernButton>
                      <CyberModernButton variant="danger">Danger</CyberModernButton>
                    </div>
                    <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap;align-items:center">
                      <CyberModernTag>TAG</CyberModernTag>
                      <CyberModernBadge>42</CyberModernBadge>
                      <CyberModernBracketLabel>LABEL</CyberModernBracketLabel>
                      <CpStatusLed status="online" :pulse="true" />
                      <CpDigitalClock :show-seconds="false" :glitch="false" />
                    </div>
                    <div style="display:flex;gap:12px;margin-top:12px;flex-wrap:wrap">
                      <CyberModernCard title="Cyber Modern" style="width:200px">
                        <div style="font-size:12px">Card 内容</div>
                      </CyberModernCard>
                      <CyberModernInput v-model="themeInputVal" placeholder="输入内容..." style="flex:1;min-width:160px" />
                    </div>
                    <div style="margin-top:12px">
                      <CyberModernProgressBar :value="72" />
                    </div>
                  </div>
                </div>
              </CpThemeProvider>

            </div>
          </template>

          <!-- ==================== 组件 ==================== -->

          <!-- Button -->
          <template v-if="activeItem === 'button'">
            <DocsTitle title="Button 按钮" desc="常用的操作按钮，提供 Cyber / SterileCyber / Sterile 三种风格。" />
            <DemoBlock title="Cyber 赛博朋克" description="shape=regular 上下线框 + 多层发光 + 悬停位移">
              <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                <CyberButton variant="primary">PRIMARY</CyberButton>
                <CyberButton variant="secondary">SECONDARY</CyberButton>
                <CyberButton variant="danger">DANGER</CyberButton>
                <CyberButton variant="ghost">GHOST</CyberButton>
              </div>
              <div style="display:flex;gap:8px;margin-top:12px;align-items:center">
                <CyberButton variant="primary" size="sm">SM</CyberButton>
                <CyberButton variant="primary" size="md">MD</CyberButton>
                <CyberButton variant="primary" size="lg">LG</CyberButton>
                <CyberButton variant="primary" :loading="true">LOAD</CyberButton>
                <CyberButton variant="primary" disabled>DISABLED</CyberButton>
              </div>
              <template #code><DemoCode :code="codes.buttonCyber" /></template>
            </DemoBlock>
            <DemoBlock title="Cyber 赛博朋克（不规则）" description="不规则梯形 + 多层发光 + 悬停位移">
              <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                <CyberButton variant="primary" shape="irregular">PRIMARY</CyberButton>
                <CyberButton variant="secondary" shape="irregular">SECONDARY</CyberButton>
                <CyberButton variant="danger" shape="irregular">DANGER</CyberButton>
                <CyberButton variant="ghost" shape="irregular">GHOST</CyberButton>
              </div>
              <div style="display:flex;gap:8px;margin-top:12px;align-items:center">
                <CyberButton variant="primary" shape="irregular" size="sm">SM</CyberButton>
                <CyberButton variant="primary" shape="irregular" size="md">MD</CyberButton>
                <CyberButton variant="primary" shape="irregular" size="lg">LG</CyberButton>
                <CyberButton variant="primary" shape="irregular" :loading="true">LOAD</CyberButton>
                <CyberButton variant="primary" shape="irregular" disabled>DISABLED</CyberButton>
              </div>
              <template #code><DemoCode :code="codes.buttonIrregular" /></template>
            </DemoBlock>
            <DemoBlock title="SterileCyber 无菌赛博" description="直角 + 克制单层发光">
              <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                <SterileCyberButton variant="primary">PRIMARY</SterileCyberButton>
                <SterileCyberButton variant="secondary">SECONDARY</SterileCyberButton>
                <SterileCyberButton variant="danger">DANGER</SterileCyberButton>
                <SterileCyberButton variant="ghost">GHOST</SterileCyberButton>
              </div>
              <template #code><DemoCode :code="codes.buttonSC" /></template>
            </DemoBlock>
            <DemoBlock title="Sterile 无菌美学" description="直角 + 零发光 + 无衬线字体">
              <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                <SterileButton variant="primary">PRIMARY</SterileButton>
                <SterileButton variant="secondary">SECONDARY</SterileButton>
                <SterileButton variant="danger">DANGER</SterileButton>
                <SterileButton variant="ghost">GHOST</SterileButton>
              </div>
              <template #code><DemoCode :code="codes.buttonSterile" /></template>
            </DemoBlock>
          </template>

          <!-- Heading -->
          <template v-if="activeItem === 'heading'">
            <DocsTitle title="Heading 标题" desc="借鉴 CP2077 风格的标题组件，带锯齿下划线 + 可选故障抖动。" />
            <DemoBlock title="Cyber 赛博朋克" description="CP2077 风格下划线 + 可选文字/横线效果">
              <div style="display:flex;flex-direction:column;gap:16px">
                <CyberHeading>默认标题</CyberHeading>
                <CyberHeading line-color="var(--cp-color-danger)" text-color="var(--cp-color-danger)">自定义颜色</CyberHeading>
                <CyberHeading :neon="true">霓虹发光</CyberHeading>
                <CyberHeading :rgb-split="true">RGB 色差</CyberHeading>
                <CyberHeading :glitched="true">Glitch 抖动</CyberHeading>
                <CyberHeading :line-pulse="true">横线脉冲</CyberHeading>
                <CyberHeading :line-glow="true">横线发光</CyberHeading>
                <CyberHeading :underline="false">无下划线</CyberHeading>
              </div>
              <template #code><DemoCode :code="codes.headingCyber" /></template>
            </DemoBlock>
            <DemoBlock title="SterileCyber" description="单层发光 + 可选效果">
              <div style="display:flex;flex-direction:column;gap:12px">
                <SterileCyberHeading>默认标题</SterileCyberHeading>
                <SterileCyberHeading :neon="true">霓虹发光</SterileCyberHeading>
                <SterileCyberHeading :line-pulse="true">横线脉冲</SterileCyberHeading>
              </div>
              <template #code><DemoCode :code="codes.headingSC" /></template>
            </DemoBlock>
            <DemoBlock title="Sterile" description="极简风格">
              <div style="display:flex;flex-direction:column;gap:12px">
                <SterileHeading>默认标题</SterileHeading>
                <SterileHeading :underline="true">带下划线</SterileHeading>
                <SterileHeading :underline="true" :line-pulse="true">横线脉冲</SterileHeading>
              </div>
              <template #code><DemoCode :code="codes.headingSterile" /></template>
            </DemoBlock>
          </template>

          <!-- Tag -->
          <template v-if="activeItem === 'tag'">
            <DocsTitle title="Tag 标签" desc="用于标记和分类，Cyber 的 irregular 模式有左侧三角突出。" />
            <DemoBlock title="Cyber">
              <div style="display:flex;gap:6px;flex-wrap:wrap">
                <CyberTag variant="default">DEFAULT</CyberTag>
                <CyberTag variant="primary">PRIMARY</CyberTag>
                <CyberTag variant="secondary">SECONDARY</CyberTag>
                <CyberTag variant="danger">DANGER</CyberTag>
                <CyberTag variant="success" closable>SUCCESS</CyberTag>
              </div>
              <template #code><DemoCode :code="codes.tagCyber" /></template>
            </DemoBlock>
            <DemoBlock title="SterileCyber">
              <div style="display:flex;gap:6px;flex-wrap:wrap">
                <SterileCyberTag variant="primary">PRIMARY</SterileCyberTag>
                <SterileCyberTag variant="secondary">SECONDARY</SterileCyberTag>
                <SterileCyberTag variant="danger">DANGER</SterileCyberTag>
              </div>
              <template #code><DemoCode :code="codes.tagSC" /></template>
            </DemoBlock>
            <DemoBlock title="Sterile">
              <div style="display:flex;gap:6px;flex-wrap:wrap">
                <SterileTag variant="primary">PRIMARY</SterileTag>
                <SterileTag variant="secondary">SECONDARY</SterileTag>
                <SterileTag variant="danger">DANGER</SterileTag>
              </div>
              <template #code><DemoCode :code="codes.tagSterile" /></template>
            </DemoBlock>
          </template>

          <!-- Badge -->
          <template v-if="activeItem === 'badge'">
            <DocsTitle title="Badge 徽章" desc="状态标记。Cyber irregular 模式左侧箭头突出。" />
            <DemoBlock title="三风格对比">
              <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
                <CyberBadge variant="primary">ONLINE</CyberBadge>
                <CyberBadge variant="danger">ERROR</CyberBadge>
                <CyberBadge variant="success">OK</CyberBadge>
                <span style="color:var(--cp-text-dim);margin:0 4px">|</span>
                <SterileCyberBadge variant="primary">ONLINE</SterileCyberBadge>
                <SterileCyberBadge variant="danger">ERROR</SterileCyberBadge>
                <span style="color:var(--cp-text-dim);margin:0 4px">|</span>
                <SterileBadge variant="primary">ONLINE</SterileBadge>
                <SterileBadge variant="danger">ERROR</SterileBadge>
              </div>
              <template #code><DemoCode :code="codes.badge" /></template>
            </DemoBlock>
          </template>

          <!-- BracketLabel -->
          <template v-if="activeItem === 'bracket-label'">
            <DocsTitle title="BracketLabel 括号标签" desc="方括号包裹的文字标签。" />
            <DemoBlock title="三风格对比">
              <div style="display:flex;gap:12px;flex-wrap:wrap">
                <div>
                  <div style="font-size:10px;color:var(--cp-color-primary);margin-bottom:6px">CYBER</div>
                  <div style="display:flex;gap:8px">
                    <CyberBracketLabel text="DEFAULT" />
                    <CyberBracketLabel text="ACCENT" variant="accent" />
                    <CyberBracketLabel text="DANGER" variant="danger" />
                  </div>
                </div>
                <div>
                  <div style="font-size:10px;color:var(--cp-color-secondary);margin-bottom:6px">STERILE CYBER</div>
                  <div style="display:flex;gap:8px">
                    <SterileCyberBracketLabel text="DEFAULT" />
                    <SterileCyberBracketLabel text="ACCENT" variant="accent" />
                    <SterileCyberBracketLabel text="DANGER" variant="danger" />
                  </div>
                </div>
                <div>
                  <div style="font-size:10px;color:var(--cp-text-muted);margin-bottom:6px">STERILE</div>
                  <div style="display:flex;gap:8px">
                    <SterileBracketLabel text="DEFAULT" />
                    <SterileBracketLabel text="ACCENT" variant="accent" />
                    <SterileBracketLabel text="DANGER" variant="danger" />
                  </div>
                </div>
              </div>
              <template #code><DemoCode :code="codes.bracket" /></template>
            </DemoBlock>
          </template>

          <!-- ==================== 表单 Form ==================== -->

          <!-- Input -->
          <template v-if="activeItem === 'input'">
            <DocsTitle title="Input 输入框" desc="文本输入框，支持清除、禁用、前缀/后缀。" />
            <DemoBlock title="Cyber" description="不规则形状 + 多层发光">
              <div style="display:flex;flex-direction:column;gap:12px;max-width:360px">
                <CyberInput v-model="inputVal" placeholder="> 霓虹输入..." />
                <CyberInput v-model="inputVal" placeholder="可清除" :clearable="true" />
                <CyberInput v-model="inputVal" placeholder="禁止输入" :disabled="true" />
              </div>
              <template #code><DemoCode :code="codes.inputCyber" /></template>
            </DemoBlock>
            <DemoBlock title="SterileCyber" description="直角 + 单层发光">
              <div style="display:flex;flex-direction:column;gap:12px;max-width:360px">
                <SterileCyberInput v-model="inputVal" placeholder="无菌赛博输入..." />
                <SterileCyberInput v-model="inputVal" placeholder="禁止输入" :disabled="true" />
              </div>
              <template #code><DemoCode :code="codes.inputSC" /></template>
            </DemoBlock>
            <DemoBlock title="Sterile" description="极简风格">
              <div style="display:flex;flex-direction:column;gap:12px;max-width:360px">
                <SterileInput v-model="inputVal" placeholder="简洁输入..." />
                <SterileInput v-model="inputVal" placeholder="禁止输入" :disabled="true" />
              </div>
              <template #code><DemoCode :code="codes.inputSterile" /></template>
            </DemoBlock>
          </template>

          <!-- ==================== 数据展示 Data ==================== -->

          <!-- Card -->
          <template v-if="activeItem === 'card'">
            <DocsTitle title="Card 卡片" desc="通用容器。Cyber irregular 有顶右大斜切 + 底左倒角。" />
            <DemoBlock title="三风格对比">
              <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px">
                <CyberCard title="CYBER" shape="irregular" :hoverable="true">
                  <p style="color:var(--cp-text-secondary);font-size:13px">不规则 + 发光</p>
                </CyberCard>
                <SterileCyberCard title="SC" :hoverable="true">
                  <p style="color:var(--cp-text-secondary);font-size:13px">直角 + 克制发光</p>
                </SterileCyberCard>
                <SterileCard title="STERILE" :hoverable="true">
                  <p style="color:var(--cp-text-secondary);font-size:13px">直角 + 无发光</p>
                </SterileCard>
              </div>
              <CyberCard title="CYBER" shape="regular" :hoverable="true" style="max-width:200px">
                <p style="color:var(--cp-text-secondary);font-size:13px">规则矩形 + 发光</p>
              </CyberCard>
              <template #code><DemoCode :code="codes.card" /></template>
            </DemoBlock>
          </template>

          <!-- Avatar -->
          <template v-if="activeItem === 'avatar'">
            <DocsTitle title="Avatar 头像" desc="用户头像。Cyber irregular 为六边形蜂巢。" />
            <DemoBlock title="六风格对比">
              <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px">
                <div>
                  <div style="font-size:10px;color:var(--cp-color-primary);margin-bottom:6px">Cyber</div>
                  <div style="display:flex;gap:12px">
                    <CyberAvatar size="sm" id="SM" />
                    <CyberAvatar size="md" :scanline="true" id="MD" />
                    <CyberAvatar size="lg" :scanline="true" status="online" :status-pulse="true" />
                  </div>
                </div>
                <div>
                  <div style="font-size:10px;color:var(--cp-color-secondary);margin-bottom:6px">SterileCyber</div>
                  <div style="display:flex;gap:12px">
                    <SterileCyberAvatar size="sm" id="SM" />
                    <SterileCyberAvatar size="md" id="MD" />
                    <SterileCyberAvatar size="lg" status="online" :status-pulse="true" />
                  </div>
                </div>
                <div>
                  <div style="font-size:10px;color:var(--cp-text-muted);margin-bottom:6px">Sterile</div>
                  <div style="display:flex;gap:12px">
                    <SterileAvatar size="sm" id="SM" />
                    <SterileAvatar size="md" id="MD" />
                    <SterileAvatar size="lg" status="online" :status-pulse="true" />
                  </div>
                </div>
                <div>
                  <div style="font-size:10px;color:#6366f1;margin-bottom:6px">Blueprint</div>
                  <div style="display:flex;gap:12px">
                    <BlueprintAvatar size="sm" id="SM" />
                    <BlueprintAvatar size="md" id="MD" />
                    <BlueprintAvatar size="lg" status="online" :status-pulse="true" />
                  </div>
                </div>
                <div>
                  <div style="font-size:10px;color:#6366f1;margin-bottom:6px">Brutal</div>
                  <div style="display:flex;gap:12px">
                    <BrutalAvatar size="sm" id="SM" />
                    <BrutalAvatar size="md" id="MD" />
                    <BrutalAvatar size="lg" status="online" :status-pulse="true" />
                  </div>
                </div>
                <div>
                  <div style="font-size:10px;color:#00f0ff;margin-bottom:6px">Noir</div>
                  <div style="display:flex;gap:12px">
                    <NoirAvatar size="sm" id="SM" />
                    <NoirAvatar size="md" id="MD" />
                    <NoirAvatar size="lg" status="online" :status-pulse="true" />
                  </div>
                </div>
              </div>
              <template #code><DemoCode :code="codes.avatar" /></template>
            </DemoBlock>
          </template>

          <!-- StatsGrid -->
          <template v-if="activeItem === 'stats-grid'">
            <DocsTitle title="StatsGrid 数据面板" desc="角装饰 + 趋势箭头 + 数值脉冲 + 扫描线。" />
            <DemoBlock title="六风格对比">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
                <div><div style="font-size:10px;color:var(--cp-color-primary);margin-bottom:6px">Cyber</div><CyberStatsGrid :stats="statsData" style="width:100%" /></div>
                <div><div style="font-size:10px;color:var(--cp-color-secondary);margin-bottom:6px">SterileCyber</div><SterileCyberStatsGrid :stats="statsData" style="width:100%" /></div>
                <div><div style="font-size:10px;color:var(--cp-text-muted);margin-bottom:6px">Sterile</div><SterileStatsGrid :stats="statsData" style="width:100%" /></div>
                <div><div style="font-size:10px;color:#6366f1;margin-bottom:6px">Blueprint</div><BlueprintStatsGrid :stats="statsData" style="width:100%" /></div>
                <div><div style="font-size:10px;color:#6366f1;margin-bottom:6px">Brutal</div><BrutalStatsGrid :stats="statsData" style="width:100%" /></div>
                <div><div style="font-size:10px;color:#00f0ff;margin-bottom:6px">Noir</div><NoirStatsGrid :stats="statsData" style="width:100%" /></div>
              </div>
              <template #code><DemoCode :code="codes.stats" /></template>
            </DemoBlock>
          </template>

          <!-- Terminal -->
          <template v-if="activeItem === 'terminal'">
            <DocsTitle title="Terminal 终端" desc="模拟命令行终端。Cyber 整体有不对称斜切。" />
            <DemoBlock title="原版风格（HeiXiaZi 黑匣子）" description="原站终端面板：全高 + 圆角 + 闪烁光标 + 扁平风格">
              <div class="heixiazi-demo">
                <div class="heixiazi-demo__container">
                  <div class="heixiazi-demo__header">
                    <span>SYSTEM_LOGS // RUN_LOG_V1.0</span>
                    <div class="heixiazi-demo__ctrls"><span>_</span><span>□</span><span style="color:#666">✕</span></div>
                  </div>
                  <div class="heixiazi-demo__body">
                    <div style="color:#ddd">&gt; Initializing system... <span style="color:#00ff00">[OK]</span></div>
                    <div style="color:#666;font-style:italic">&gt; Connection established. Session ID: #A7F2</div>
                    <div style="color:#ddd">&gt; <span style="color:#888">[INIT]</span> Migration 042 applied <span style="color:#00ff00">[OK]</span></div>
                    <div style="color:#ddd">&gt; <span style="color:#888">[DB]</span> Cache miss <span style="color:var(--cp-yellow, #fce803)">[WARN]</span></div>
                    <div style="color:#ddd">&gt; <span style="color:#888">[NET]</span> Node response: 142ms</div>
                    <div style="color:var(--cp-red, #ff3333)">&gt; <span style="color:var(--cp-red, #ff3333)">[ERR]</span> Timeout on shard 7</div>
                    <div class="heixiazi-demo__cursor">>_</div>
                  </div>
                  <div class="heixiazi-demo__status">
                    <span>STATUS:</span>
                    <span class="heixiazi-demo__dot" />
                    <span>MONITORING</span>
                    <span style="margin-left:auto">MEM: 2.1TB / 128TB</span>
                    <span style="margin-left:8px">UPTIME: 14d</span>
                  </div>
                </div>
              </div>
            </DemoBlock>
            <DemoBlock title="六风格对比">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
                <div><div style="font-size:10px;color:var(--cp-color-primary);margin-bottom:6px">Cyber</div><CyberTerminal title="SYSTEM.LOG" :entries="terminalEntries" status-state="online" status-text="ACTIVE" memory="2.1GB" uptime="14d" /></div>
                <div><div style="font-size:10px;color:var(--cp-color-secondary);margin-bottom:6px">SterileCyber</div><SterileCyberTerminal title="SC.LOG" :entries="terminalEntries" status-state="online" status-text="ACTIVE" memory="2.1GB" uptime="14d" /></div>
                <div><div style="font-size:10px;color:var(--cp-text-muted);margin-bottom:6px">Sterile</div><SterileTerminal title="SYSTEM.LOG" :entries="terminalEntries" status-state="online" status-text="ACTIVE" memory="2.1GB" uptime="14d" /></div>
                <div><div style="font-size:10px;color:#6366f1;margin-bottom:6px">Blueprint</div><BlueprintTerminal title="BP.LOG" :entries="terminalEntries" status-state="online" status-text="ACTIVE" memory="2.1GB" uptime="14d" /></div>
                <div><div style="font-size:10px;color:#6366f1;margin-bottom:6px">Brutal</div><BrutalTerminal title="BRUTAL.LOG" :entries="terminalEntries" status-state="online" status-text="ACTIVE" memory="2.1GB" uptime="14d" /></div>
                <div><div style="font-size:10px;color:#00f0ff;margin-bottom:6px">Noir</div><NoirTerminal title="NOIR.LOG" :entries="terminalEntries" status-state="online" status-text="ACTIVE" memory="2.1GB" uptime="14d" /></div>
              </div>
              <template #code><DemoCode :code="codes.terminal" /></template>
            </DemoBlock>
          </template>

          <!-- ChatBubble -->
          <template v-if="activeItem === 'chat-bubble'">
            <DocsTitle title="ChatBubble 聊天气泡" desc="对话气泡。Cyber 左上角有斜切。" />
            <DemoBlock title="六风格对比">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
                <div>
                  <div style="font-size:10px;color:var(--cp-color-primary);margin-bottom:6px">Cyber</div>
                  <div style="display:flex;flex-direction:column;gap:8px">
                    <CyberChatBubble direction="left" variant="system" header="SYSTEM" tag="AUTO" timestamp="14:32:07">Neural link established.</CyberChatBubble>
                    <CyberChatBubble direction="right" header="USER" timestamp="14:32:10">Component scan.</CyberChatBubble>
                  </div>
                </div>
                <div>
                  <div style="font-size:10px;color:var(--cp-color-secondary);margin-bottom:6px">SterileCyber</div>
                  <div style="display:flex;flex-direction:column;gap:8px">
                    <SterileCyberChatBubble direction="left" variant="system" header="SYSTEM" tag="AUTO" timestamp="14:32:07">Neural link established.</SterileCyberChatBubble>
                    <SterileCyberChatBubble direction="right" header="USER" timestamp="14:32:10">Component scan.</SterileCyberChatBubble>
                  </div>
                </div>
                <div>
                  <div style="font-size:10px;color:var(--cp-text-muted);margin-bottom:6px">Sterile</div>
                  <div style="display:flex;flex-direction:column;gap:8px">
                    <SterileChatBubble direction="left" variant="system" header="SYSTEM" tag="AUTO" timestamp="14:32:07">Neural link established.</SterileChatBubble>
                    <SterileChatBubble direction="right" header="USER" timestamp="14:32:10">Component scan.</SterileChatBubble>
                  </div>
                </div>
                <div>
                  <div style="font-size:10px;color:#6366f1;margin-bottom:6px">Blueprint</div>
                  <div style="display:flex;flex-direction:column;gap:8px">
                    <BlueprintChatBubble direction="left" variant="system" header="SYSTEM" tag="AUTO" timestamp="14:32:07">Neural link established.</BlueprintChatBubble>
                    <BlueprintChatBubble direction="right" header="USER" timestamp="14:32:10">Component scan.</BlueprintChatBubble>
                  </div>
                </div>
                <div>
                  <div style="font-size:10px;color:#6366f1;margin-bottom:6px">Brutal</div>
                  <div style="display:flex;flex-direction:column;gap:8px">
                    <BrutalChatBubble direction="left" variant="system" header="SYSTEM" tag="AUTO" timestamp="14:32:07">Neural link established.</BrutalChatBubble>
                    <BrutalChatBubble direction="right" header="USER" timestamp="14:32:10">Component scan.</BrutalChatBubble>
                  </div>
                </div>
                <div>
                  <div style="font-size:10px;color:#00f0ff;margin-bottom:6px">Noir</div>
                  <div style="display:flex;flex-direction:column;gap:8px">
                    <NoirChatBubble direction="left" variant="system" header="SYSTEM" tag="AUTO" timestamp="14:32:07">Neural link established.</NoirChatBubble>
                    <NoirChatBubble direction="right" header="USER" timestamp="14:32:10">Component scan.</NoirChatBubble>
                  </div>
                </div>
              </div>
              <template #code><DemoCode :code="codes.chat" /></template>
            </DemoBlock>
          </template>

          <!-- Panel -->
          <template v-if="activeItem === 'panel'">
            <DocsTitle title="Panel 面板" desc="带标题的内容容器。Cyber irregular 蜂窝四角斜切。" />
            <DemoBlock title="六风格对比">
              <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px">
                <CyberPanel title="SYSTEM" label="monitor" shape="irregular">
                  <div style="display:flex;gap:8px"><CpStatusLed status="online" :pulse="true" /><span style="color:var(--cp-text-secondary);font-size:12px">API ONLINE</span></div>
                </CyberPanel>
                <SterileCyberPanel title="SC PANEL" label="monitor">
                  <div style="display:flex;gap:8px"><CpStatusLed status="online" :pulse="true" /><span style="color:var(--cp-text-secondary);font-size:12px">API ONLINE</span></div>
                </SterileCyberPanel>
                <SterilePanel title="Panel" label="monitor">
                  <div style="display:flex;gap:8px"><CpStatusLed status="online" :pulse="true" /><span style="color:var(--cp-text-secondary);font-size:12px">API ONLINE</span></div>
                </SterilePanel>
                <BlueprintPanel title="BLUEPRINT" label="monitor">
                  <div style="display:flex;gap:8px"><CpStatusLed status="online" :pulse="true" /><span style="color:var(--cp-text-secondary);font-size:12px">API ONLINE</span></div>
                </BlueprintPanel>
                <BrutalPanel title="BRUTAL" label="monitor">
                  <div style="display:flex;gap:8px"><CpStatusLed status="online" :pulse="true" /><span style="color:var(--cp-text-secondary);font-size:12px">API ONLINE</span></div>
                </BrutalPanel>
                <NoirPanel title="NOIR" label="monitor">
                  <div style="display:flex;gap:8px"><CpStatusLed status="online" :pulse="true" /><span style="color:var(--cp-text-secondary);font-size:12px">API ONLINE</span></div>
                </NoirPanel>
              </div>
              <template #code><DemoCode :code="codes.panel" /></template>
            </DemoBlock>
          </template>

          <!-- ==================== 导航 Navigation ==================== -->

          <!-- Pagination -->
          <template v-if="activeItem === 'pagination'">
            <DocsTitle title="Pagination 分页" desc="数据翻页。Cyber 提供规则 / 不规则两种形状。" />
            <DemoBlock title="六风格对比">
              <div style="display:flex;flex-direction:column;gap:20px">
                <div><div style="font-size:10px;color:var(--cp-color-primary);margin-bottom:6px">Cyber</div><CyberPagination :current-page="currentPage" :total-pages="12" @update:current-page="currentPage = $event" /></div>
                <div><div style="font-size:10px;color:var(--cp-color-secondary);margin-bottom:6px">SterileCyber</div><SterileCyberPagination :current-page="currentPage" :total-pages="12" @update:current-page="currentPage = $event" /></div>
                <div><div style="font-size:10px;color:var(--cp-text-muted);margin-bottom:6px">Sterile</div><SterilePagination :current-page="currentPage" :total-pages="12" @update:current-page="currentPage = $event" /></div>
                <div><div style="font-size:10px;color:#6366f1;margin-bottom:6px">Blueprint</div><BlueprintPagination :current-page="currentPage" :total-pages="12" @update:current-page="currentPage = $event" /></div>
                <div><div style="font-size:10px;color:#6366f1;margin-bottom:6px">Brutal</div><BrutalPagination :current-page="currentPage" :total-pages="12" @update:current-page="currentPage = $event" /></div>
                <div><div style="font-size:10px;color:#00f0ff;margin-bottom:6px">Noir</div><NoirPagination :current-page="currentPage" :total-pages="12" @update:current-page="currentPage = $event" /></div>
              </div>
              <template #code><DemoCode :code="codes.paginationSC" /></template>
            </DemoBlock>
          </template>

          <!-- CategoryTabs -->
          <template v-if="activeItem === 'category-tabs'">
            <DocsTitle title="CategoryTabs 分类标签" desc="分类选择器。Cyber 提供规则 / 不规则两种形状。" />
            <DemoBlock title="六风格对比">
              <div style="display:flex;flex-direction:column;gap:20px">
                <div><div style="font-size:10px;color:var(--cp-color-primary);margin-bottom:6px">Cyber</div><CyberCategoryTabs :tabs="catTabs" v-model="activeCat" /></div>
                <div><div style="font-size:10px;color:var(--cp-color-secondary);margin-bottom:6px">SterileCyber</div><SterileCyberCategoryTabs :tabs="catTabs" v-model="activeCat" /></div>
                <div><div style="font-size:10px;color:var(--cp-text-muted);margin-bottom:6px">Sterile</div><SterileCategoryTabs :tabs="catTabs" v-model="activeCat" /></div>
                <div><div style="font-size:10px;color:#6366f1;margin-bottom:6px">Blueprint</div><BlueprintCategoryTabs :tabs="catTabs" v-model="activeCat" /></div>
                <div><div style="font-size:10px;color:#6366f1;margin-bottom:6px">Brutal</div><BrutalCategoryTabs :tabs="catTabs" v-model="activeCat" /></div>
                <div><div style="font-size:10px;color:#00f0ff;margin-bottom:6px">Noir</div><NoirCategoryTabs :tabs="catTabs" v-model="activeCat" /></div>
              </div>
              <template #code><DemoCode :code="codes.catTabsSC" /></template>
            </DemoBlock>
          </template>

          <!-- ==================== 反馈 Feedback ==================== -->

          <!-- Modal -->
          <template v-if="activeItem === 'modal'">
            <DocsTitle title="Modal 弹窗" desc="对话框。Cyber 有大斜边 + 角落装饰。" />
            <DemoBlock title="六风格对比">
              <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
                <CyberButton variant="primary" @click="showCyberModal = true">Cyber Modal</CyberButton>
                <SterileCyberButton variant="primary" @click="showSCModal = true">SC Modal</SterileCyberButton>
                <SterileButton variant="primary" @click="showSterileModal = true">Sterile Modal</SterileButton>
                <BlueprintButton variant="primary" @click="showBlueprintModal = true">Blueprint Modal</BlueprintButton>
                <BrutalButton variant="primary" @click="showBrutalModal = true">Brutal Modal</BrutalButton>
                <NoirButton variant="primary" @click="showNoirModal = true">Noir Modal</NoirButton>
              </div>
              <CyberModal v-model="showCyberModal" size="md">
                <h3 style="color:var(--cp-color-primary);font-family:var(--cp-font-mono);margin-bottom:12px">CYBER.MODAL</h3>
                <p style="color:var(--cp-text-secondary)">大斜边窗体 + 角落装饰 + 发光边框。</p>
                <div style="margin-top:16px;display:flex;gap:10px">
                  <CyberButton variant="primary" size="sm" @click="showCyberModal = false">CONFIRM</CyberButton>
                </div>
              </CyberModal>
              <SterileCyberModal v-model="showSCModal" size="md">
                <h3 style="color:var(--cp-color-secondary);font-family:var(--cp-font-mono);margin-bottom:12px">SC.MODAL</h3>
                <p style="color:var(--cp-text-secondary)">直角 + 克制发光。</p>
                <div style="margin-top:16px"><SterileCyberButton variant="primary" size="sm" @click="showSCModal = false">CONFIRM</SterileCyberButton></div>
              </SterileCyberModal>
              <SterileModal v-model="showSterileModal" size="md">
                <h3 style="color:var(--cp-text-primary);font-family:var(--cp-font-sans);margin-bottom:12px">Sterile Modal</h3>
                <p style="color:var(--cp-text-secondary)">直角 + 无发光。</p>
                <div style="margin-top:16px"><SterileButton variant="primary" size="sm" @click="showSterileModal = false">CONFIRM</SterileButton></div>
              </SterileModal>
              <BlueprintModal v-model="showBlueprintModal" size="md">
                <h3 style="color:#6366f1;font-family:var(--cp-font-mono);margin-bottom:12px">BLUEPRINT.MODAL</h3>
                <p style="color:var(--cp-text-secondary)">工程图纸风格 + 虚线边框。</p>
                <div style="margin-top:16px"><BlueprintButton variant="primary" size="sm" @click="showBlueprintModal = false">CONFIRM</BlueprintButton></div>
              </BlueprintModal>
              <BrutalModal v-model="showBrutalModal" size="md">
                <h3 style="color:#6366f1;font-family:var(--cp-font-mono);margin-bottom:12px">BRUTAL.MODAL</h3>
                <p style="color:var(--cp-text-secondary)">终端粗野风格 + 直角硬边。</p>
                <div style="margin-top:16px"><BrutalButton variant="primary" size="sm" @click="showBrutalModal = false">CONFIRM</BrutalButton></div>
              </BrutalModal>
              <NoirModal v-model="showNoirModal" size="md">
                <h3 style="color:#00f0ff;font-family:var(--cp-font-mono);margin-bottom:12px">NOIR.MODAL</h3>
                <p style="color:var(--cp-text-secondary)">霓虹黑风格 + 发光边框。</p>
                <div style="margin-top:16px"><NoirButton variant="primary" size="sm" @click="showNoirModal = false">CONFIRM</NoirButton></div>
              </NoirModal>
              <template #code><DemoCode :code="codes.modal" /></template>
            </DemoBlock>
          </template>

          <!-- ProgressBar -->
          <template v-if="activeItem === 'progress'">
            <DocsTitle title="ProgressBar 进度条" desc="进度指示。Cyber 轨道为左右斜切。" />
            <DemoBlock title="三风格对比">
              <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px">
                <div>
                  <div style="font-size:10px;color:var(--cp-color-primary);margin-bottom:6px">Cyber</div>
                  <div style="display:flex;flex-direction:column;gap:8px">
                    <CyberProgressBar :value="72" :height="4" />
                    <CyberProgressBar :value="45" variant="primary" :animated="true" :height="6" />
                    <CyberProgressBar :value="23" variant="danger" :height="4" />
                  </div>
                </div>
                <div>
                  <div style="font-size:10px;color:var(--cp-color-secondary);margin-bottom:6px">SC</div>
                  <div style="display:flex;flex-direction:column;gap:8px">
                    <SterileCyberProgressBar :value="72" :height="4" />
                    <SterileCyberProgressBar :value="45" variant="primary" :animated="true" :height="6" />
                    <SterileCyberProgressBar :value="23" variant="danger" :height="4" />
                  </div>
                </div>
                <div>
                  <div style="font-size:10px;color:var(--cp-text-muted);margin-bottom:6px">Sterile</div>
                  <div style="display:flex;flex-direction:column;gap:8px">
                    <SterileProgressBar :value="72" :height="4" />
                    <SterileProgressBar :value="45" variant="primary" :animated="true" :height="6" />
                    <SterileProgressBar :value="23" variant="danger" :height="4" />
                  </div>
                </div>
              </div>
              <template #code><DemoCode :code="codes.progress" /></template>
            </DemoBlock>
          </template>

          <!-- ==================== 赛博专属 Cyber Only ==================== -->

          <template v-if="activeItem === 'glitch-text'">
            <DocsTitle title="GlitchText 故障文字" desc="赛博朋克专属的故障闪烁效果，也支持 Hero 标题场景。" />
            <DemoBlock title="基础用法">
              <CyberGlitchText text="WAKE UP" tag="h2" style="font-size:36px" />
              <div style="margin-top:12px"><CyberGlitchText text="SYSTEM BREACH DETECTED" tag="p" style="font-size:18px" /></div>
              <template #code><DemoCode :code="codes.glitchText" /></template>
            </DemoBlock>
            <DemoBlock title="Hero 标题模式" description="用 Oswald 字体 + 大字号实现原网站的主标题效果">
              <CyberGlitchText text="WAKE THE F*** UP" tag="h1" font-family="Oswald, sans-serif" font-size="5rem" />
              <div style="margin-top:16px">
                <CyberGlitchText text="NEURAL LINK" tag="h2" font-family="Oswald, sans-serif" font-size="3rem" :pulse="true" />
              </div>
              <template #code><DemoCode :code="codes.glitchHero" /></template>
            </DemoBlock>
            <DemoBlock title="强度控制">
              <div style="display:flex;flex-direction:column;gap:12px">
                <div><span style="color:var(--cp-text-muted);font-size:11px">LOW</span><CyberGlitchText text="SUBTLE" tag="span" style="font-size:24px" glitch-intensity="low" /></div>
                <div><span style="color:var(--cp-text-muted);font-size:11px">MEDIUM</span><CyberGlitchText text="DEFAULT" tag="span" style="font-size:24px" /></div>
                <div><span style="color:var(--cp-text-muted);font-size:11px">HIGH</span><CyberGlitchText text="INTENSE" tag="span" style="font-size:24px" glitch-intensity="high" /></div>
              </div>
              <template #code><DemoCode :code="codes.glitchIntensity" /></template>
            </DemoBlock>
          </template>

          <template v-if="activeItem === 'decipher-text'">
            <DocsTitle title="DecipherText 解码文字" desc="文字逐字解码显示效果。" />
            <DemoBlock title="基础用法">
              <div style="font-size:20px"><CyberDecipherText text="ACCESS GRANTED" :speed="40" /></div>
              <template #code><DemoCode :code="codes.decipherText" /></template>
            </DemoBlock>
          </template>

          <template v-if="activeItem === 'cyber-decor'">
            <DocsTitle title="赛博装饰组件" desc="CornerBrackets / ScanLine / LabelBar 等装饰性组件。" />
            <DemoBlock title="CornerBrackets 角括号">
              <CyberCornerBrackets>
                <div style="padding:24px;border:1px solid var(--cp-border-base);background:var(--cp-bg-panel)">
                  <span style="color:var(--cp-text-secondary)">Corner Brackets</span>
                </div>
              </CyberCornerBrackets>
              <template #code><DemoCode :code="codes.cornerBrackets" /></template>
            </DemoBlock>
            <DemoBlock title="ScanLine 扫描线">
              <CyberScanLine :opacity="0.06" style="position:relative;padding:60px 20px;border:1px solid var(--cp-border-base);background:var(--cp-bg-panel)">
                <p style="color:var(--cp-text-secondary);position:relative;z-index:12;font-family:'Share Tech Mono',monospace;text-align:center">
                  // 扫描线从上往下移动<br>横纹 CRT 纹理覆盖
                </p>
              </CyberScanLine>
              <template #code><DemoCode :code="codes.scanLine" /></template>
            </DemoBlock>
            <DemoBlock title="LabelBar / MonitorEye">
              <div style="display:flex;gap:24px;align-items:center;flex-wrap:wrap">
                <CyberLabelBar text="DATA_STREAM" />
                <div style="display:flex;gap:16px">
                  <div style="display:flex;align-items:center;gap:6px"><CyberMonitorEye status="online" style="width:32px;height:32px" /><span style="color:var(--cp-text-muted);font-size:11px">ONLINE</span></div>
                  <div style="display:flex;align-items:center;gap:6px"><CyberMonitorEye status="scanning" style="width:32px;height:32px" /><span style="color:var(--cp-text-muted);font-size:11px">SCANNING</span></div>
                  <div style="display:flex;align-items:center;gap:6px"><CyberMonitorEye status="alert" style="width:32px;height:32px" /><span style="color:var(--cp-text-muted);font-size:11px">ALERT</span></div>
                </div>
              </div>
              <template #code><DemoCode :code="codes.decorMix" /></template>
            </DemoBlock>
          </template>

          <template v-if="activeItem === 'boot-animation'">
            <DocsTitle title="BootAnimation 开机动画" desc="全屏遮罩 + 自定义标题 + 进度条，sessionStorage 控制每会话只播一次。" />
            <DemoBlock title="Cyber" description="点击按钮触发开机动画（注意：默认每会话只播一次，刷新页面不会重播）">
              <div style="display:flex;gap:12px;align-items:center">
                <CyberButton variant="primary" @click="bootAnimRef?.start()">触发开机动画</CyberButton>
                <CyberButton variant="secondary" @click="sessionStorage.removeItem('cp-boot-animation-played'); bootAnimRef?.start()">清除缓存并重播</CyberButton>
              </div>
              <CyberBootAnimation ref="bootAnimRef" title="INITIALIZING NEURAL LINK..." :auto-start="false" :session-once="false" />
              <template #code><DemoCode :code="codes.bootAnimation" /></template>
            </DemoBlock>
          </template>

          <template v-if="activeItem === 'disconnect'">
            <DocsTitle title="Disconnect 断开连接" desc="原站断开连接彩蛋按钮：红色危险项 + 随机弹窗幽默信息。" />
            <DemoBlock title="Cyber" description="点击触发随机彩蛋弹窗，每次内容不同">
              <div style="max-width:300px">
                <CyberDisconnect />
              </div>
              <template #code><DemoCode :code="codes.disconnect" /></template>
            </DemoBlock>
          </template>

          <!-- ==================== 蓝图专属 Blueprint Only ==================== -->

          <template v-if="activeItem === 'blueprint-components'">
            <DocsTitle title="蓝图组件" desc="蓝图主题专属组件族：工程图纸语言——虚线框、刻度标尺、图例键、编号章、剖面线、尺寸标注，零辉光零切角。" />
            <CpThemeProvider theme="blueprint">
              <DemoBlock title="设计语言" description="Blueprint 蓝图主题的核心视觉签名">
                <div style="padding:16px;background:var(--cp-bg-base);border:1px solid var(--cp-border-base);font-size:13px;line-height:1.8">
                  <div style="margin-bottom:12px;font-family:var(--cp-font-mono);color:var(--cp-color-primary);letter-spacing:0.1em">BLUEPRINT DESIGN LANGUAGE</div>
                  <div style="color:var(--cp-text-secondary)">
                    <div style="margin-bottom:8px"><strong style="color:var(--cp-text-primary)">▪ 图纸语言：</strong>虚线框、刻度标尺、图例键、编号章、剖面线（45° 斜线纹理）</div>
                    <div style="margin-bottom:8px"><strong style="color:var(--cp-text-primary)">▪ 配色体系：</strong>靛蓝 Primary / 青色 Secondary / 红色 Danger，零辉光零切角</div>
                    <div style="margin-bottom:8px"><strong style="color:var(--cp-text-primary)">▪ 排版规则：</strong>mono 全大写、加宽字距、尺寸标注箭头 ◄── ──►</div>
                    <div style="margin-bottom:8px"><strong style="color:var(--cp-text-primary)">▪ 交互反馈：</strong>hover 叠加 45° 斜线填充动画（剖面线扫过效果）</div>
                    <div><strong style="color:var(--cp-text-primary)">▪ 适用场景：</strong>技术文档、工程看板、系统架构图、API 文档</div>
                  </div>
                </div>
              </DemoBlock>
              <DemoBlock title="Button 按钮" description="靛蓝实心 / 青色虚线描边 / 红色描边，hover 叠加 45° 斜线填充">
                <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                  <BlueprintButton variant="primary">Primary</BlueprintButton>
                  <BlueprintButton variant="secondary">Secondary</BlueprintButton>
                  <BlueprintButton variant="danger">Danger</BlueprintButton>
                  <BlueprintButton variant="ghost">Ghost</BlueprintButton>
                </div>
                <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap;align-items:center">
                  <BlueprintButton size="sm">SM</BlueprintButton>
                  <BlueprintButton size="md">MD</BlueprintButton>
                  <BlueprintButton size="lg">LG</BlueprintButton>
                </div>
                <template #code><DemoCode :code="codes.blueprintButton" /></template>
              </DemoBlock>
              <DemoBlock title="Heading 标题" description="尺寸标注线风格标题">
                <BlueprintHeading>MODULE HEADING</BlueprintHeading>
                <template #code><DemoCode :code="codes.blueprintHeading" /></template>
              </DemoBlock>
              <DemoBlock title="Tag / Badge / BracketLabel" description="图例格标签 + 直角编号格 + 尺寸标注">
                <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                  <BlueprintTag>Tag</BlueprintTag>
                  <BlueprintTag variant="primary">Primary</BlueprintTag>
                  <BlueprintTag variant="danger">Danger</BlueprintTag>
                  <BlueprintBadge text="42" />
                  <BlueprintBadge variant="primary" text="07" />
                  <BlueprintBracketLabel text="LABEL" />
                  <BlueprintBracketLabel variant="accent" text="ACCENT" />
                </div>
                <template #code><DemoCode :code="codes.blueprintMeta" /></template>
              </DemoBlock>
              <DemoBlock title="Card / Input" description="四角十字 + 虚线内框 + FIG. 编号卡片，角部刻度输入框">
                <div style="display:flex;gap:12px;flex-wrap:wrap">
                  <BlueprintCard title="MODULE" style="width:200px">
                    <div style="font-size:12px">Card 内容</div>
                  </BlueprintCard>
                  <BlueprintInput v-model="themeInputVal" placeholder="尺寸标注..." style="flex:1;min-width:160px" />
                </div>
                <template #code><DemoCode :code="codes.blueprintCard" /></template>
              </DemoBlock>
              <DemoBlock title="ProgressBar 进度条" description="标尺刻度固定在上，靛蓝→青填充推进，末端亮边脉动">
                <BlueprintProgressBar :value="72" :animated="true" />
                <div style="margin-top:12px"><BlueprintProgressBar variant="danger" :value="30" /></div>
                <template #code><DemoCode :code="codes.blueprintProgress" /></template>
              </DemoBlock>
              <DemoBlock title="综合演示" description="工程图纸风格的完整面板">
                <div style="border:2px solid var(--cp-border-base);padding:20px;background:var(--cp-bg-void);position:relative">
                  <div style="position:absolute;top:-1px;left:-1px;width:16px;height:16px;border-top:2px solid var(--cp-color-primary);border-left:2px solid var(--cp-color-primary)"></div>
                  <div style="position:absolute;top:-1px;right:-1px;width:16px;height:16px;border-top:2px solid var(--cp-color-primary);border-right:2px solid var(--cp-color-primary)"></div>
                  <div style="position:absolute;bottom:-1px;left:-1px;width:16px;height:16px;border-bottom:2px solid var(--cp-color-secondary);border-left:2px solid var(--cp-color-secondary)"></div>
                  <div style="position:absolute;bottom:-1px;right:-1px;width:16px;height:16px;border-bottom:2px solid var(--cp-color-secondary);border-right:2px solid var(--cp-color-secondary)"></div>
                  <BlueprintHeading style="margin-bottom:16px">SYSTEM BLUEPRINT</BlueprintHeading>
                  <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">
                    <BlueprintTag>v2.0.7</BlueprintTag>
                    <BlueprintBadge text="08" />
                    <BlueprintBracketLabel text="MODULE_A" />
                    <BlueprintTag variant="primary">ACTIVE</BlueprintTag>
                  </div>
                  <div style="display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap">
                    <BlueprintButton variant="primary">Execute</BlueprintButton>
                    <BlueprintButton variant="secondary">Analyze</BlueprintButton>
                    <BlueprintButton variant="danger">Abort</BlueprintButton>
                  </div>
                  <BlueprintProgressBar :value="68" :animated="true" />
                  <div style="margin-top:16px;font-family:var(--cp-font-mono);font-size:11px;color:var(--cp-text-muted);text-align:right">FIG. 2024.10.06</div>
                </div>
              </DemoBlock>
            </CpThemeProvider>
          </template>

          <!-- ==================== 终端粗野专属 Brutal Only ==================== -->

          <template v-if="activeItem === 'brutal-components'">
            <DocsTitle title="粗野组件" desc="终端粗野专属组件族：荧光橙朋克海报——网点纹理、ASCII 字符、粗边倾斜、硬投影、`>` 命令提示符，零圆角零辉光。" />
            <CpThemeProvider theme="brutal">
              <DemoBlock title="设计语言" description="Brutal 终端粗野主题的核心视觉签名">
                <div style="padding:16px;background:var(--cp-bg-base);border:4px solid var(--cp-border-base);font-size:13px;line-height:1.8">
                  <div style="margin-bottom:12px;font-family:var(--cp-font-mono);color:var(--cp-color-primary);letter-spacing:0.2em;text-transform:uppercase">BRUTAL DESIGN LANGUAGE</div>
                  <div style="color:var(--cp-text-secondary)">
                    <div style="margin-bottom:8px"><strong style="color:var(--cp-text-primary)">▪ 朋克印刷：</strong>荧光橙 #ff6b35、网点纹理（半色调印刷）、ASCII 字符 █░、粗边倾斜 -3deg</div>
                    <div style="margin-bottom:8px"><strong style="color:var(--cp-text-primary)">▪ 终端元素：</strong>`>` 命令提示符、`[ ]` 方括号标注、等宽 mono 全大写、超宽字距</div>
                    <div style="margin-bottom:8px"><strong style="color:var(--cp-text-primary)">▪ 配色体系：</strong>纯黑背景、荧光橙 Primary、白色 Secondary、红色 Danger，零圆角零辉光</div>
                    <div style="margin-bottom:8px"><strong style="color:var(--cp-text-primary)">▪ 交互反馈：</strong>hover 网点密度变化、硬投影 6px、直接反白填充</div>
                    <div><strong style="color:var(--cp-text-primary)">▪ 适用场景：</strong>命令行工具、开发者工具、极客社区、朋克风活动页</div>
                  </div>
                </div>
              </DemoBlock>
              <DemoBlock title="Button 按钮" description="直角方块 + 等宽大写，PRIMARY 荧光橙 + 网点纹理，hover 反白填充">
                <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                  <BrutalButton variant="primary">Primary</BrutalButton>
                  <BrutalButton variant="secondary">Secondary</BrutalButton>
                  <BrutalButton variant="danger">Danger</BrutalButton>
                  <BrutalButton variant="ghost">Ghost</BrutalButton>
                </div>
                <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap;align-items:center">
                  <BrutalButton size="sm">SM</BrutalButton>
                  <BrutalButton size="md">MD</BrutalButton>
                  <BrutalButton size="lg">LG</BrutalButton>
                </div>
                <template #code><DemoCode :code="codes.brutalButton" /></template>
              </DemoBlock>
              <DemoBlock title="Heading 标题" description="等宽大写 + 2px 粗结构线">
                <BrutalHeading>SYSTEM READY</BrutalHeading>
                <template #code><DemoCode :code="codes.brutalHeading" /></template>
              </DemoBlock>
              <DemoBlock title="Tag / Badge / BracketLabel" description="直角硬边小格 + 终端方括号标注">
                <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                  <BrutalTag>Tag</BrutalTag>
                  <BrutalTag variant="primary">Primary</BrutalTag>
                  <BrutalTag variant="danger">Danger</BrutalTag>
                  <BrutalBadge text="42" />
                  <BrutalBadge variant="primary" text="07" />
                  <BrutalBracketLabel text="LABEL" />
                  <BrutalBracketLabel variant="accent" text="ACCENT" />
                </div>
                <template #code><DemoCode :code="codes.brutalMeta" /></template>
              </DemoBlock>
              <DemoBlock title="Card / Input" description="标题行 2px 粗结构线卡片，内置 > 提示符输入框">
                <div style="display:flex;gap:12px;flex-wrap:wrap">
                  <BrutalCard title="module" style="width:200px">
                    <div style="font-size:12px">Card 内容</div>
                  </BrutalCard>
                  <BrutalInput v-model="themeInputVal" placeholder="输入命令..." style="flex:1;min-width:160px" />
                </div>
                <template #code><DemoCode :code="codes.brutalCard" /></template>
              </DemoBlock>
              <DemoBlock title="ProgressBar 进度条" description="ASCII 字符填充 ████░░ + 百分比数字，steps() 跳动推进">
                <BrutalProgressBar :value="72" :animated="true" />
                <div style="margin-top:12px"><BrutalProgressBar variant="danger" :value="30" /></div>
                <template #code><DemoCode :code="codes.brutalProgress" /></template>
              </DemoBlock>
              <DemoBlock title="综合演示" description="终端朋克风格的完整命令面板">
                <div style="border:6px solid #000;padding:20px;background:var(--cp-bg-void);box-shadow:6px 6px 0 rgba(255,107,53,0.3)">
                  <BrutalHeading style="margin-bottom:16px">$ SYSTEM_READY</BrutalHeading>
                  <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">
                    <BrutalTag>v3.14</BrutalTag>
                    <BrutalBadge text="99" />
                    <BrutalBracketLabel text="ROOT" />
                    <BrutalTag variant="danger">HOT</BrutalTag>
                  </div>
                  <BrutalInput v-model="themeInputVal" placeholder="> type command..." style="width:100%;margin-bottom:16px" />
                  <div style="display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap">
                    <BrutalButton variant="primary">EXEC</BrutalButton>
                    <BrutalButton variant="secondary">SCAN</BrutalButton>
                    <BrutalButton variant="danger">KILL</BrutalButton>
                  </div>
                  <BrutalProgressBar :value="85" :animated="true" />
                  <div style="margin-top:16px;font-family:var(--cp-font-mono);font-size:11px;color:var(--cp-text-muted);text-transform:uppercase;letter-spacing:0.1em">[STATUS: ACTIVE]</div>
                </div>
              </DemoBlock>
            </CpThemeProvider>
          </template>

          <!-- ==================== 霓虹黑专属 Noir Only ==================== -->

          <template v-if="activeItem === 'noir-components'">
            <DocsTitle title="霓虹组件" desc="霓虹黑专属组件族：黑色电影氛围——Cormorant 衬线、宽字距、克制霓虹辉光、胶片颗粒、暗金配色、切角卡片。" />
            <CpThemeProvider theme="neon-noir">
              <DemoBlock title="设计语言" description="Noir 霓虹黑主题的核心视觉签名">
                <div style="padding:16px;background:var(--cp-bg-base);border:1px solid var(--cp-border-base);font-size:13px;line-height:1.8">
                  <div style="margin-bottom:12px;font-family:'Cormorant Garamond',serif;font-size:18px;color:var(--cp-color-primary);letter-spacing:0.15em">NOIR DESIGN LANGUAGE</div>
                  <div style="color:var(--cp-text-secondary)">
                    <div style="margin-bottom:8px"><strong style="color:var(--cp-text-primary)">▪ 电影质感：</strong>衬线字体 Cormorant Garamond、胶片颗粒纹理、暗金暖色调、低饱和度</div>
                    <div style="margin-bottom:8px"><strong style="color:var(--cp-text-primary)">▪ 霓虹元素：</strong>克制辉光（仅按钮和强调）、青色 #00d9ff Primary、品红 #ff006e Secondary、切角几何</div>
                    <div style="margin-bottom:8px"><strong style="color:var(--cp-text-primary)">▪ 排版规则：</strong>宽字距大写、下划线强调、衬线标题 + 无衬线正文对比</div>
                    <div style="margin-bottom:8px"><strong style="color:var(--cp-text-primary)">▪ 交互反馈：</strong>hover 辉光强度变化、柔光晕扩散、切角边框闪烁</div>
                    <div><strong style="color:var(--cp-text-primary)">▪ 适用场景：</strong>作品集、艺术展示、夜店活动、电影网站、潮牌官网</div>
                  </div>
                </div>
              </DemoBlock>
              <DemoBlock title="Button 按钮" description="宽字距大写 + 柔光晕，primary 青 #00d9ff / danger 红 #ff006e">
                <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                  <NoirButton variant="primary">Primary</NoirButton>
                  <NoirButton variant="secondary">Secondary</NoirButton>
                  <NoirButton variant="danger">Danger</NoirButton>
                  <NoirButton variant="ghost">Ghost</NoirButton>
                </div>
                <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap;align-items:center">
                  <NoirButton size="sm">SM</NoirButton>
                  <NoirButton size="md">MD</NoirButton>
                  <NoirButton size="lg">LG</NoirButton>
                </div>
                <template #code><DemoCode :code="codes.noirButton" /></template>
              </DemoBlock>
              <DemoBlock title="Heading 标题" description="Cormorant Garamond 衬线标题">
                <NoirHeading>霓虹标题</NoirHeading>
                <template #code><DemoCode :code="codes.noirHeading" /></template>
              </DemoBlock>
              <DemoBlock title="Tag / Badge / BracketLabel" description="霓虹黑风格的标签、徽章与括号标注">
                <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                  <NoirTag>Tag</NoirTag>
                  <NoirTag variant="primary">Primary</NoirTag>
                  <NoirTag variant="danger">Danger</NoirTag>
                  <NoirBadge text="42" />
                  <NoirBadge variant="primary" text="07" />
                  <NoirBracketLabel text="LABEL" />
                  <NoirBracketLabel variant="accent" text="ACCENT" />
                </div>
                <template #code><DemoCode :code="codes.noirMeta" /></template>
              </DemoBlock>
              <DemoBlock title="Card / Input" description="衬线标题卡片 + 霓虹黑输入框">
                <div style="display:flex;gap:12px;flex-wrap:wrap">
                  <NoirCard title="场景" style="width:200px">
                    <div style="font-size:12px">Card 内容</div>
                  </NoirCard>
                  <NoirInput v-model="themeInputVal" placeholder="输入框..." style="flex:1;min-width:160px" />
                </div>
                <template #code><DemoCode :code="codes.noirCard" /></template>
              </DemoBlock>
              <DemoBlock title="ProgressBar 进度条" description="霓虹黑进度条，青色辉光渐变填充">
                <NoirProgressBar :value="72" :animated="true" />
                <div style="margin-top:12px"><NoirProgressBar variant="danger" :value="30" /></div>
                <template #code><DemoCode :code="codes.noirProgress" /></template>
              </DemoBlock>
              <DemoBlock title="综合演示" description="黑色电影风格的完整场景面板">
                <div style="border:1px solid var(--cp-border-base);padding:24px;background:var(--cp-bg-void);clip-path:polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))">
                  <NoirHeading style="margin-bottom:20px">雾都夜景</NoirHeading>
                  <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">
                    <NoirTag>SCENE_07</NoirTag>
                    <NoirBadge text="42" />
                    <NoirBracketLabel text="FILM NOIR" />
                    <NoirTag variant="primary">ACTIVE</NoirTag>
                  </div>
                  <NoirInput v-model="themeInputVal" placeholder="输入场景..." style="width:100%;margin-bottom:16px" />
                  <div style="display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap">
                    <NoirButton variant="primary">开始</NoirButton>
                    <NoirButton variant="secondary">暂停</NoirButton>
                    <NoirButton variant="danger">终止</NoirButton>
                  </div>
                  <NoirProgressBar :value="67" :animated="true" />
                  <div style="margin-top:16px;font-family:'Cormorant Garamond',serif;font-size:13px;color:var(--cp-text-muted);letter-spacing:0.1em;font-style:italic">"In the neon-lit darkness..."</div>
                </div>
              </DemoBlock>
            </CpThemeProvider>
          </template>

          <!-- ==================== 无菌专属 Sterile ==================== -->

          <template v-if="activeItem === 'sterile-components'">
            <DocsTitle title="无菌组件" desc="无菌专属组件族：医疗级精准——Inter/Roboto 无衬线、极简直角、细线分割、高对比黑白、零装饰零特效。" />
            <CpThemeProvider theme="sterile-dark">
              <DemoBlock title="设计语言" description="Sterile 无菌主题的核心视觉签名">
                <div style="padding:16px;background:var(--cp-bg-base);border:1px solid var(--cp-border-base);font-size:13px;line-height:1.8">
                  <div style="margin-bottom:12px;font-size:16px;font-weight:600;color:var(--cp-text-primary);letter-spacing:0.05em">STERILE DESIGN LANGUAGE</div>
                  <div style="color:var(--cp-text-secondary)">
                    <div style="margin-bottom:8px"><strong style="color:var(--cp-text-primary)">▪ 极简主义：</strong>Inter/Roboto 无衬线、零装饰、零圆角、零阴影、零渐变、零动画</div>
                    <div style="margin-bottom:8px"><strong style="color:var(--cp-text-primary)">▪ 医疗精准：</strong>1px 细线分割、8px 网格对齐、高对比黑白、纯色填充、平面设计</div>
                    <div style="margin-bottom:8px"><strong style="color:var(--cp-text-primary)">▪ 排版规则：</strong>常规大小写、紧凑字距、清晰层级、无斜体无粗体装饰</div>
                    <div style="margin-bottom:8px"><strong style="color:var(--cp-text-primary)">▪ 交互反馈：</strong>即时反白填充、无过渡动画、直接状态切换、二值逻辑</div>
                    <div><strong style="color:var(--cp-text-primary)">▪ 适用场景：</strong>医疗系统、数据后台、监控仪表板、实验室界面、专业工具</div>
                  </div>
                </div>
              </DemoBlock>
              <DemoBlock title="Button 按钮" description="直角按钮 + 平面填充，primary 纯黑/纯白">
                <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                  <SterileButton variant="primary">Primary</SterileButton>
                  <SterileButton variant="secondary">Secondary</SterileButton>
                  <SterileButton variant="danger">Danger</SterileButton>
                  <SterileButton variant="ghost">Ghost</SterileButton>
                </div>
                <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap;align-items:center">
                  <SterileButton size="sm">SM</SterileButton>
                  <SterileButton size="md">MD</SterileButton>
                  <SterileButton size="lg">LG</SterileButton>
                </div>
                <template #code><DemoCode :code="codes.sterileButton" /></template>
              </DemoBlock>
              <DemoBlock title="Heading 标题" description="无衬线精准标题">
                <SterileHeading>无菌标题</SterileHeading>
                <template #code><DemoCode :code="codes.sterileHeading" /></template>
              </DemoBlock>
              <DemoBlock title="Tag / Badge / BracketLabel" description="无菌风格的标签、徽章与括号标注">
                <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                  <SterileTag>Tag</SterileTag>
                  <SterileTag variant="primary">Primary</SterileTag>
                  <SterileTag variant="danger">Danger</SterileTag>
                  <SterileBadge text="42" />
                  <SterileBadge variant="primary" text="07" />
                  <SterileBracketLabel text="LABEL" />
                  <SterileBracketLabel variant="accent" text="ACCENT" />
                </div>
                <template #code><DemoCode :code="codes.sterileMeta" /></template>
              </DemoBlock>
              <DemoBlock title="Card / Input" description="直角卡片 + 无菌输入框">
                <div style="display:flex;gap:12px;flex-wrap:wrap">
                  <SterileCard title="数据" style="width:200px">
                    <div style="font-size:12px">Card 内容</div>
                  </SterileCard>
                  <SterileInput v-model="themeInputVal" placeholder="输入框..." style="flex:1;min-width:160px" />
                </div>
                <template #code><DemoCode :code="codes.sterileCard" /></template>
              </DemoBlock>
              <DemoBlock title="ProgressBar 进度条" description="无菌进度条，平面填充">
                <SterileProgressBar :value="72" :animated="false" />
                <div style="margin-top:12px"><SterileProgressBar variant="danger" :value="30" /></div>
                <template #code><DemoCode :code="codes.sterileProgress" /></template>
              </DemoBlock>
              <DemoBlock title="综合演示" description="医疗级精准的完整监控面板">
                <div style="border:1px solid var(--cp-border-base);padding:24px;background:var(--cp-bg-void)">
                  <SterileHeading style="margin-bottom:20px">系统监控</SterileHeading>
                  <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">
                    <SterileTag>SYS_01</SterileTag>
                    <SterileBadge text="99" />
                    <SterileBracketLabel text="MONITOR" />
                    <SterileTag variant="primary">ACTIVE</SterileTag>
                  </div>
                  <SterileInput v-model="themeInputVal" placeholder="输入指令..." style="width:100%;margin-bottom:16px" />
                  <div style="display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap">
                    <SterileButton variant="primary">启动</SterileButton>
                    <SterileButton variant="secondary">暂停</SterileButton>
                    <SterileButton variant="danger">停止</SterileButton>
                  </div>
                  <SterileProgressBar :value="85" :animated="false" />
                  <div style="margin-top:16px;font-size:12px;color:var(--cp-text-muted)">Status: All systems operational</div>
                </div>
              </DemoBlock>
            </CpThemeProvider>
          </template>

          <!-- ==================== 现代专属区域 Modern Zone ==================== -->

          <template v-if="activeItem === 'modern-components'">
            <DocsTitle title="现代组件" desc="Modern 现代科技专属组件族：commandcode.ai 风格——纯黑背景、Linear 电紫、极简圆角、高对比度、Inter 字体。" />
            <CpThemeProvider theme="modern">
              <DemoBlock title="设计语言" description="Modern 现代主题的核心视觉签名">
                <div style="padding:16px;background:var(--cp-surface-1);border:1px solid var(--cp-border);font-size:13px;line-height:1.8;border-radius:8px">
                  <div style="margin-bottom:12px;font-size:16px;font-weight:600;color:var(--cp-text-primary);letter-spacing:-0.02em">MODERN DESIGN LANGUAGE</div>
                  <div style="color:var(--cp-text-secondary)">
                    <div style="margin-bottom:8px"><strong style="color:var(--cp-text-primary)">▪ 现代科技：</strong>纯黑背景 (#000)、极简圆角、微妙阴影、流畅动画</div>
                    <div style="margin-bottom:8px"><strong style="color:var(--cp-text-primary)">▪ 配色体系：</strong>Linear 电紫 (#5e6ad2) / 青色强调 (#00d9ff) / 高对比度文字</div>
                    <div style="margin-bottom:8px"><strong style="color:var(--cp-text-primary)">▪ 排版规则：</strong>Inter 字体、紧凑负字距、几何感、清晰层级</div>
                    <div style="margin-bottom:8px"><strong style="color:var(--cp-text-primary)">▪ 交互反馈：</strong>柔和过渡、pill 形按钮、focus ring、流畅动效</div>
                    <div><strong style="color:var(--cp-text-primary)">▪ 适用场景：</strong>SaaS 产品、开发工具、AI 应用、科技品牌官网</div>
                  </div>
                </div>
              </DemoBlock>
              <DemoBlock title="Tooltip 提示框" description="微妙阴影 + 柔和圆角的悬浮提示">
                <div style="display:flex;gap:40px;flex-wrap:wrap;align-items:center;padding:60px 20px">
                  <ModernTooltip content="这是一个提示">
                    <ModernButton>悬停查看</ModernButton>
                  </ModernTooltip>
                  <ModernTooltip content="顶部提示" placement="top">
                    <ModernButton variant="secondary">Top</ModernButton>
                  </ModernTooltip>
                </div>
              </DemoBlock>
              <DemoBlock title="Chip 标签片" description="圆润可删除标签">
                <div style="display:flex;gap:8px;flex-wrap:wrap">
                  <ModernChip>Vue.js</ModernChip>
                  <ModernChip variant="primary">TypeScript</ModernChip>
                  <ModernChip closable @close="() => {}">可关闭</ModernChip>
                </div>
              </DemoBlock>
              <DemoBlock title="Switch 开关" description="流畅动画的优雅开关">
                <div style="display:flex;flex-direction:column;gap:16px">
                  <div style="display:flex;gap:12px;align-items:center">
                    <ModernSwitch :model-value="true" />
                    <span style="color:var(--cp-text-secondary)">已开启</span>
                  </div>
                </div>
              </DemoBlock>
              <DemoBlock title="Select 选择器" description="流畅展开的下拉选择">
                <ModernSelect :model-value="'option1'" :options="[{value:'option1',label:'选项 1'},{value:'option2',label:'选项 2'}]" style="width:200px" />
              </DemoBlock>
            </CpThemeProvider>
          </template>

          <!-- ==================== 赛博现代专属区域 CyberModern Zone ==================== -->

          <template v-if="activeItem === 'cyber-modern-components'">
            <DocsTitle title="赛博现代组件" desc="CyberModern 赛博现代专属组件族：赛博朋克 × 现代科技融合——霓虹青 + 电紫、扫描线、全息投影、RGB 故障。" />
            <CpThemeProvider theme="cyber-modern">
              <DemoBlock title="设计语言" description="CyberModern 融合主题的核心视觉签名">
                <div style="padding:16px;background:var(--cp-surface-1);border:1px solid var(--cp-border);font-size:13px;line-height:1.8;border-radius:8px">
                  <div style="margin-bottom:12px;font-size:16px;font-weight:600;color:var(--cp-text-primary)">CYBER-MODERN LANGUAGE</div>
                  <div style="color:var(--cp-text-secondary)">
                    <div style="margin-bottom:8px"><strong style="color:var(--cp-text-primary)">▪ 融合美学：</strong>赛博朋克霓虹 + 现代科技简约</div>
                    <div style="margin-bottom:8px"><strong style="color:var(--cp-text-primary)">▪ 配色体系：</strong>霓虹青 (#00f0ff) / 电紫 (#b026ff)</div>
                    <div style="margin-bottom:8px"><strong style="color:var(--cp-text-primary)">▪ 特效签名：</strong>CRT 扫描线、全息投影、RGB 故障、辉光脉冲</div>
                    <div style="margin-bottom:8px"><strong style="color:var(--cp-text-primary)">▪ 适用场景：</strong>游戏 UI、科幻品牌、元宇宙、赛博作品展示</div>
                  </div>
                </div>
              </DemoBlock>
              <DemoBlock title="Glitch 故障效果" description="RGB 分离 + 数字乱码">
                <div style="display:flex;gap:16px;flex-wrap:wrap">
                  <CyberModernGlitch text="GLITCH EFFECT" />
                  <CyberModernGlitch text="赛博故障" intensity="high" />
                </div>
              </DemoBlock>
              <DemoBlock title="Hologram 全息卡片" description="扫描线 + 半透明全息投影">
                <CyberModernHologram style="width:300px;padding:24px">
                  <div style="font-size:18px;font-weight:600;margin-bottom:8px;color:var(--cp-primary)">HOLOGRAM</div>
                  <div style="font-size:13px;color:var(--cp-text-secondary)">全息投影界面</div>
                </CyberModernHologram>
              </DemoBlock>
              <DemoBlock title="ScanLine 扫描线容器" description="CRT 显示器扫描线">
                <CyberModernScanLine style="padding:32px;border:1px solid var(--cp-border)">
                  <div style="font-family:var(--cp-font-family-mono);color:var(--cp-primary);font-size:14px">
                    > SCANNING...<br>
                    > LOADING...
                  </div>
                </CyberModernScanLine>
              </DemoBlock>
              <DemoBlock title="Pulse 脉冲按钮" description="辉光波纹扩散">
                <div style="display:flex;gap:12px;flex-wrap:wrap">
                  <CyberModernPulse>启动系统</CyberModernPulse>
                  <CyberModernPulse variant="danger">警报</CyberModernPulse>
                </div>
              </DemoBlock>
            </CpThemeProvider>
          </template>

          <!-- ==================== 现代专属单个组件 Modern Only ==================== -->

          <template v-if="activeItem === 'modern-tooltip'">
            <DocsTitle title="ModernTooltip 提示框" desc="现代科技风格的悬浮提示框，微妙阴影 + 柔和圆角。" />
            <CpThemeProvider theme="modern">
              <DemoBlock title="基础用法" description="鼠标悬停触发提示">
                <div style="display:flex;gap:40px;flex-wrap:wrap;align-items:center;padding:60px 20px">
                  <ModernTooltip content="这是一个提示">
                    <ModernButton>悬停查看提示</ModernButton>
                  </ModernTooltip>
                  <ModernTooltip content="顶部提示" placement="top">
                    <ModernButton variant="secondary">顶部</ModernButton>
                  </ModernTooltip>
                  <ModernTooltip content="底部提示" placement="bottom">
                    <ModernButton variant="secondary">底部</ModernButton>
                  </ModernTooltip>
                  <ModernTooltip content="左侧提示" placement="left">
                    <ModernButton variant="secondary">左侧</ModernButton>
                  </ModernTooltip>
                  <ModernTooltip content="右侧提示" placement="right">
                    <ModernButton variant="secondary">右侧</ModernButton>
                  </ModernTooltip>
                </div>
              </DemoBlock>
            </CpThemeProvider>
          </template>

          <template v-if="activeItem === 'modern-chip'">
            <DocsTitle title="ModernChip 标签片" desc="现代风格的可删除标签，圆润设计 + 关闭按钮。" />
            <CpThemeProvider theme="modern">
              <DemoBlock title="基础用法" description="可删除的标签片">
                <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                  <ModernChip>Vue.js</ModernChip>
                  <ModernChip variant="primary">TypeScript</ModernChip>
                  <ModernChip variant="danger">Deprecated</ModernChip>
                  <ModernChip closable @close="() => {}">可关闭</ModernChip>
                  <ModernChip variant="primary" closable @close="() => {}">Primary 可关闭</ModernChip>
                </div>
              </DemoBlock>
            </CpThemeProvider>
          </template>

          <template v-if="activeItem === 'modern-switch'">
            <DocsTitle title="ModernSwitch 开关" desc="现代风格的优雅开关，流畅动画 + 圆形滑块。" />
            <CpThemeProvider theme="modern">
              <DemoBlock title="基础用法" description="开关控制">
                <div style="display:flex;flex-direction:column;gap:16px">
                  <div style="display:flex;gap:12px;align-items:center">
                    <ModernSwitch :model-value="true" />
                    <span style="color:var(--cp-text-secondary)">已开启</span>
                  </div>
                  <div style="display:flex;gap:12px;align-items:center">
                    <ModernSwitch :model-value="false" />
                    <span style="color:var(--cp-text-secondary)">已关闭</span>
                  </div>
                  <div style="display:flex;gap:12px;align-items:center">
                    <ModernSwitch :model-value="true" variant="primary" />
                    <span style="color:var(--cp-text-secondary)">Primary 变体</span>
                  </div>
                  <div style="display:flex;gap:12px;align-items:center">
                    <ModernSwitch :model-value="true" disabled />
                    <span style="color:var(--cp-text-muted)">禁用状态</span>
                  </div>
                </div>
              </DemoBlock>
            </CpThemeProvider>
          </template>

          <template v-if="activeItem === 'modern-select'">
            <DocsTitle title="ModernSelect 选择器" desc="现代风格的下拉选择框，流畅展开动画。" />
            <CpThemeProvider theme="modern">
              <DemoBlock title="基础用法" description="下拉选择">
                <div style="display:flex;flex-direction:column;gap:16px;max-width:300px">
                  <ModernSelect 
                    :model-value="'vue'" 
                    :options="[
                      { label: 'Vue.js', value: 'vue' },
                      { label: 'React', value: 'react' },
                      { label: 'Angular', value: 'angular' },
                      { label: 'Svelte', value: 'svelte' }
                    ]" 
                    placeholder="选择框架"
                  />
                  <ModernSelect 
                    :options="[
                      { label: 'TypeScript', value: 'ts' },
                      { label: 'JavaScript', value: 'js' }
                    ]" 
                    placeholder="选择语言"
                  />
                </div>
              </DemoBlock>
            </CpThemeProvider>
          </template>

          <!-- ==================== 赛博现代专属 CyberModern Only ==================== -->

          <template v-if="activeItem === 'cyber-modern-glitch'">
            <DocsTitle title="CyberModernGlitch 故障效果" desc="赛博现代风格的文字故障效果，RGB 分离 + 数字乱码。" />
            <CpThemeProvider theme="cyber-modern">
              <DemoBlock title="基础用法" description="故障文字效果">
                <div style="display:flex;flex-direction:column;gap:20px;align-items:flex-start">
                  <CyberModernGlitch text="CYBER MODERN" :animated="true" />
                  <CyberModernGlitch text="数据流异常" intensity="high" :animated="true" />
                  <CyberModernGlitch text="SYSTEM ERROR" variant="danger" :animated="true" />
                </div>
              </DemoBlock>
            </CpThemeProvider>
          </template>

          <template v-if="activeItem === 'cyber-modern-hologram'">
            <DocsTitle title="CyberModernHologram 全息卡片" desc="赛博现代风格的全息投影卡片，扫描线 + 半透明层。" />
            <CpThemeProvider theme="cyber-modern">
              <DemoBlock title="基础用法" description="全息投影效果">
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px">
                  <CyberModernHologram title="Neural Link">
                    <div style="font-size:13px;line-height:1.6">脑机接口协议 v2.1 已激活</div>
                  </CyberModernHologram>
                  <CyberModernHologram title="Quantum Core" variant="primary">
                    <div style="font-size:13px;line-height:1.6">量子核心运算中...</div>
                  </CyberModernHologram>
                  <CyberModernHologram title="System Alert" variant="danger">
                    <div style="font-size:13px;line-height:1.6">检测到数据流异常</div>
                  </CyberModernHologram>
                </div>
              </DemoBlock>
            </CpThemeProvider>
          </template>

          <template v-if="activeItem === 'cyber-modern-scanline'">
            <DocsTitle title="CyberModernScanLine 扫描线" desc="赛博现代风格的扫描线容器，模拟 CRT 显示器效果。" />
            <CpThemeProvider theme="cyber-modern">
              <DemoBlock title="基础用法" description="扫描线效果容器">
                <CyberModernScanLine>
                  <div style="padding:32px;text-align:center">
                    <div style="font-size:24px;font-weight:600;margin-bottom:12px;color:var(--cp-color-primary)">TERMINAL ACCESS</div>
                    <div style="font-size:14px;color:var(--cp-text-secondary)">扫描线效果模拟 CRT 显示器</div>
                  </div>
                </CyberModernScanLine>
              </DemoBlock>
            </CpThemeProvider>
          </template>

          <template v-if="activeItem === 'cyber-modern-pulse'">
            <DocsTitle title="CyberModernPulse 脉冲按钮" desc="赛博现代风格的脉冲按钮，辉光波纹扩散效果。" />
            <CpThemeProvider theme="cyber-modern">
              <DemoBlock title="基础用法" description="脉冲辉光按钮">
                <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
                  <CyberModernPulse>启动系统</CyberModernPulse>
                  <CyberModernPulse variant="primary">连接神经</CyberModernPulse>
                  <CyberModernPulse variant="danger">紧急中断</CyberModernPulse>
                  <CyberModernPulse size="lg">大号脉冲</CyberModernPulse>
                </div>
              </DemoBlock>
            </CpThemeProvider>
          </template>

          <!-- ==================== 共享 Shared ==================== -->

          <template v-if="activeItem === 'logo'">
            <DocsTitle title="Logo 品牌标识" desc="金属立体阴影文字 + 多种效果变体。" />
            <DemoBlock title="CpLogo" description="基础 Logo，hover 触发 glitch，bordered 加黑边">
              <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start">
                <CpLogo text="CpUI" size="lg" />
                <CpLogo text="CpUI" size="md" :bordered="true" />
                <CpLogo text="CpUI" size="sm" />
                <CpLogo text="YUANFANGMAO" size="md" :bordered="true" />
                <CpLogo text="CpUI" size="md" href="https://example.com" />
              </div>
              <div style="display:flex;gap:20px;margin-top:16px;align-items:flex-end;flex-wrap:wrap">
                <div><span style="display:block;font-size:10px;color:var(--cp-text-muted);margin-bottom:4px">Oswald</span><CpLogo text="LOGO" size="md" /></div>
                <div><span style="display:block;font-size:10px;color:var(--cp-text-muted);margin-bottom:4px">Share Tech Mono</span><CpLogo text="LOGO" size="md" font-family="'Share Tech Mono',monospace" /></div>
                <div><span style="display:block;font-size:10px;color:var(--cp-text-muted);margin-bottom:4px">Orbitron</span><CpLogo text="LOGO" size="md" font-family="'Orbitron',sans-serif" /></div>
                <div><span style="display:block;font-size:10px;color:var(--cp-text-muted);margin-bottom:4px">Rajdhani</span><CpLogo text="LOGO" size="md" font-family="'Rajdhani',sans-serif" /></div>
              </div>
              <template #code><DemoCode :code="codes.logo" /></template>
            </DemoBlock>
            <DemoBlock title="CpLogoTvOff" description="hover 触发 glitch → CRT 关机 → 恢复">
              <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start">
                <CpLogoTvOff text="CpUI" size="lg" />
                <CpLogoTvOff text="CpUI" size="md" />
                <CpLogoTvOff text="YUANFANGMAO" size="md" />
              </div>
              <div style="display:flex;gap:20px;margin-top:16px;align-items:flex-end;flex-wrap:wrap">
                <div><span style="display:block;font-size:10px;color:var(--cp-text-muted);margin-bottom:4px">Oswald</span><CpLogoTvOff text="LOGO" size="md" /></div>
                <div><span style="display:block;font-size:10px;color:var(--cp-text-muted);margin-bottom:4px">Share Tech Mono</span><CpLogoTvOff text="LOGO" size="md" font-family="'Share Tech Mono',monospace" /></div>
                <div><span style="display:block;font-size:10px;color:var(--cp-text-muted);margin-bottom:4px">Orbitron</span><CpLogoTvOff text="LOGO" size="md" font-family="'Orbitron',sans-serif" /></div>
                <div><span style="display:block;font-size:10px;color:var(--cp-text-muted);margin-bottom:4px">Rajdhani</span><CpLogoTvOff text="LOGO" size="md" font-family="'Rajdhani',sans-serif" /></div>
              </div>
              <template #code><DemoCode :code="codes.logoTvOff" /></template>
            </DemoBlock>
            <DemoBlock title="CpLogoNeon" description="霓虹发光呼吸动画">
              <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start">
                <CpLogoNeon text="CpUI" size="lg" />
                <CpLogoNeon text="CpUI" size="md" />
                <CpLogoNeon text="YUANFANGMAO" size="md" />
              </div>
              <div style="display:flex;gap:20px;margin-top:16px;align-items:flex-end;flex-wrap:wrap">
                <div><span style="display:block;font-size:10px;color:var(--cp-text-muted);margin-bottom:4px">Oswald</span><CpLogoNeon text="LOGO" size="md" /></div>
                <div><span style="display:block;font-size:10px;color:var(--cp-text-muted);margin-bottom:4px">Share Tech Mono</span><CpLogoNeon text="LOGO" size="md" font-family="'Share Tech Mono',monospace" /></div>
                <div><span style="display:block;font-size:10px;color:var(--cp-text-muted);margin-bottom:4px">Orbitron</span><CpLogoNeon text="LOGO" size="md" font-family="'Orbitron',sans-serif" /></div>
                <div><span style="display:block;font-size:10px;color:var(--cp-text-muted);margin-bottom:4px">Rajdhani</span><CpLogoNeon text="LOGO" size="md" font-family="'Rajdhani',sans-serif" /></div>
              </div>
              <template #code><DemoCode :code="codes.logoNeon" /></template>
            </DemoBlock>
            <DemoBlock title="CpLogoFlicker" description="接触不良灯牌感：随机闪烁 + 短暂熄灭 + 亮度跳动">
              <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start">
                <CpLogoFlicker text="CpUI" size="lg" />
                <CpLogoFlicker text="CpUI" size="md" />
                <CpLogoFlicker text="YUANFANGMAO" size="md" />
              </div>
              <div style="display:flex;gap:20px;margin-top:16px;align-items:flex-end;flex-wrap:wrap">
                <div><span style="display:block;font-size:10px;color:var(--cp-text-muted);margin-bottom:4px">Oswald</span><CpLogoFlicker text="LOGO" size="md" /></div>
                <div><span style="display:block;font-size:10px;color:var(--cp-text-muted);margin-bottom:4px">Share Tech Mono</span><CpLogoFlicker text="LOGO" size="md" font-family="'Share Tech Mono',monospace" /></div>
                <div><span style="display:block;font-size:10px;color:var(--cp-text-muted);margin-bottom:4px">Orbitron</span><CpLogoFlicker text="LOGO" size="md" font-family="'Orbitron',sans-serif" /></div>
                <div><span style="display:block;font-size:10px;color:var(--cp-text-muted);margin-bottom:4px">Rajdhani</span><CpLogoFlicker text="LOGO" size="md" font-family="'Rajdhani',sans-serif" /></div>
              </div>
              <template #code><DemoCode :code="codes.logoFlicker" /></template>
            </DemoBlock>
            <DemoBlock title="CpLogoScanline" description="CRT 扫描线纹理 + 明暗闪烁">
              <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start">
                <CpLogoScanline text="CpUI" size="lg" />
                <CpLogoScanline text="CpUI" size="md" />
                <CpLogoScanline text="YUANFANGMAO" size="md" />
              </div>
              <div style="display:flex;gap:20px;margin-top:16px;align-items:flex-end;flex-wrap:wrap">
                <div><span style="display:block;font-size:10px;color:var(--cp-text-muted);margin-bottom:4px">Oswald</span><CpLogoScanline text="LOGO" size="md" /></div>
                <div><span style="display:block;font-size:10px;color:var(--cp-text-muted);margin-bottom:4px">Share Tech Mono</span><CpLogoScanline text="LOGO" size="md" font-family="'Share Tech Mono',monospace" /></div>
                <div><span style="display:block;font-size:10px;color:var(--cp-text-muted);margin-bottom:4px">Orbitron</span><CpLogoScanline text="LOGO" size="md" font-family="'Orbitron',sans-serif" /></div>
                <div><span style="display:block;font-size:10px;color:var(--cp-text-muted);margin-bottom:4px">Rajdhani</span><CpLogoScanline text="LOGO" size="md" font-family="'Rajdhani',sans-serif" /></div>
              </div>
              <template #code><DemoCode :code="codes.logoScanline" /></template>
            </DemoBlock>
            <DemoBlock title="CpLogoDecipher" description="打字机逐字解码，从乱码到正常文字">
              <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start">
                <CpLogoDecipher text="CpUI" size="lg" />
                <CpLogoDecipher text="CpUI" size="md" />
                <CpLogoDecipher text="YUANFANGMAO" size="md" />
              </div>
              <div style="display:flex;gap:20px;margin-top:16px;align-items:flex-end;flex-wrap:wrap">
                <div><span style="display:block;font-size:10px;color:var(--cp-text-muted);margin-bottom:4px">Oswald</span><CpLogoDecipher text="LOGO" size="md" /></div>
                <div><span style="display:block;font-size:10px;color:var(--cp-text-muted);margin-bottom:4px">Share Tech Mono</span><CpLogoDecipher text="LOGO" size="md" font-family="'Share Tech Mono',monospace" /></div>
                <div><span style="display:block;font-size:10px;color:var(--cp-text-muted);margin-bottom:4px">Orbitron</span><CpLogoDecipher text="LOGO" size="md" font-family="'Orbitron',sans-serif" /></div>
                <div><span style="display:block;font-size:10px;color:var(--cp-text-muted);margin-bottom:4px">Rajdhani</span><CpLogoDecipher text="LOGO" size="md" font-family="'Rajdhani',sans-serif" /></div>
              </div>
              <template #code><DemoCode :code="codes.logoDecipher" /></template>
            </DemoBlock>
          </template>

          <template v-if="activeItem === 'shared-utils'">
            <DocsTitle title="共享组件" desc="不区分风格的通用基础组件：状态指示、时钟、背景、网格、HUD 条、工具栏等。" />
            <DemoBlock title="StatusLed 状态指示灯" description="三种状态：online / warning / error，支持脉动动画">
              <div style="display:flex;gap:24px;align-items:center;flex-wrap:wrap">
                <div style="display:flex;align-items:center;gap:6px"><CpStatusLed status="online" :pulse="true" /><span style="color:var(--cp-text-muted);font-size:12px">ONLINE</span></div>
                <div style="display:flex;align-items:center;gap:6px"><CpStatusLed status="warning" :pulse="true" /><span style="color:var(--cp-text-muted);font-size:12px">WARNING</span></div>
                <div style="display:flex;align-items:center;gap:6px"><CpStatusLed status="error" :pulse="true" /><span style="color:var(--cp-text-muted);font-size:12px">ERROR</span></div>
              </div>
            </DemoBlock>
            <DemoBlock title="DigitalClock 数字时钟" description="可选显示秒数、glitch 故障效果">
              <div style="display:flex;gap:24px;align-items:center;flex-wrap:wrap">
                <CpDigitalClock :show-seconds="true" :glitch="true" />
                <CpDigitalClock :show-seconds="false" />
              </div>
            </DemoBlock>
            <DemoBlock title="TypingIndicator 输入指示器" description="三点跳动动画，表示正在输入">
              <div style="display:flex;gap:24px;align-items:center;flex-wrap:wrap">
                <CpTypingIndicator />
                <div style="display:flex;align-items:center;gap:8px;padding:12px;background:var(--cp-bg-panel);border-radius:var(--cp-radius-md)">
                  <span style="color:var(--cp-text-secondary);font-size:13px">AI 正在思考</span>
                  <CpTypingIndicator />
                </div>
              </div>
              <template #code><DemoCode :code="codes.shared" /></template>
            </DemoBlock>
            <DemoBlock title="综合演示" description="共享组件组合使用场景">
              <div style="border:1px solid var(--cp-border-base);min-height:240px;position:relative;overflow:hidden">
                <CpHudStrip position="top" />
                <div style="padding:24px">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
                    <div style="display:flex;align-items:center;gap:12px">
                      <CpLogo text="CPUI" size="sm" />
                      <div style="display:flex;gap:12px">
                        <div style="display:flex;align-items:center;gap:4px"><CpStatusLed status="online" :pulse="true" /><span style="color:var(--cp-text-muted);font-size:11px">SYSTEM</span></div>
                        <div style="display:flex;align-items:center;gap:4px"><CpStatusLed status="warning" :pulse="true" /><span style="color:var(--cp-text-muted);font-size:11px">CACHE</span></div>
                      </div>
                    </div>
                    <CpDigitalClock :show-seconds="true" :glitch="true" />
                  </div>
                  <div style="padding:16px;background:var(--cp-bg-elevated);border:1px solid var(--cp-border-base);border-radius:var(--cp-radius-md)">
                    <div style="font-family:var(--cp-font-mono);font-size:13px;color:var(--cp-text-secondary);line-height:1.8">
                      <div style="margin-bottom:8px;color:var(--cp-color-primary)">> System initializing...</div>
                      <div style="margin-bottom:8px">Loading modules [████████░░] 80%</div>
                      <div style="display:flex;align-items:center;gap:8px">
                        <span>AI agent responding</span>
                        <CpTypingIndicator />
                      </div>
                    </div>
                  </div>
                </div>
                <CpHudStrip position="bottom" dense />
                <CpFloatingToolbar position="right">
                  <CpToolButton label="Settings">⚙</CpToolButton>
                  <CpToolButton label="Help">?</CpToolButton>
                </CpFloatingToolbar>
              </div>
            </DemoBlock>
          </template>

          <template v-if="activeItem === 'background'">
            <DocsTitle title="Background / GridLayer 背景层" desc="多风格背景 + 网格纹理叠加。" />
            <DemoBlock title="CpBackground" description="5 种变体：neon / mesh / glow / minimal / horizon">
              <div style="display:flex;gap:12px;flex-wrap:wrap">
                <div v-for="v in ['neon','mesh','glow','minimal','horizon']" :key="v" @click="bgVariant = v" :style="{padding:'6px 12px',cursor:'pointer',border:'1px solid',borderColor:bgVariant===v?'var(--cp-color-secondary)':'var(--cp-border-base)',color:bgVariant===v?'var(--cp-color-secondary)':'var(--cp-text-muted)',fontSize:'0.75rem'}">{{ v }}</div>
              </div>
              <p style="color:var(--cp-text-muted);font-size:12px;margin-top:8px">背景已应用到整个页面，点击切换变体查看效果</p>
              <template #code><DemoCode :code="codes.background" /></template>
            </DemoBlock>
            <DemoBlock title="CpGridLayer" description="网格纹理：dot / line / blueprint（虚线 + 交点锚点方块）">
              <div style="display:flex;gap:12px">
                <div v-for="p in ['dot','line','blueprint']" :key="p" @click="showGrid=true;gridPattern=p" :style="{padding:'6px 12px',cursor:'pointer',border:'1px solid var(--cp-border-base)',fontSize:'0.75rem',color:'var(--cp-text-muted)'}">{{ p }}</div>
                <div @click="showGrid=false" :style="{padding:'6px 12px',cursor:'pointer',border:'1px solid var(--cp-border-base)',fontSize:'0.75rem',color:'var(--cp-text-muted)'}">关闭</div>
              </div>
              <p style="color:var(--cp-text-muted);font-size:12px;margin-top:8px">网格已叠加到页面，点击切换图案</p>
              <template #code><DemoCode :code="codes.gridLayer" /></template>
            </DemoBlock>
          </template>

          <template v-if="activeItem === 'hud-strip'">
            <DocsTitle title="HudStrip 状态条" desc="顶部/底部 HUD 装饰条。" />
            <DemoBlock title="CpHudStrip" description="position: top / bottom, dense 紧凑模式">
              <div style="position:relative;height:80px;border:1px solid var(--cp-border-base);overflow:hidden">
                <CpHudStrip position="top" />
                <div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--cp-text-muted);font-size:12px">CONTENT AREA</div>
                <CpHudStrip position="bottom" dense />
              </div>
              <template #code><DemoCode :code="codes.hudStrip" /></template>
            </DemoBlock>
          </template>

          <template v-if="activeItem === 'floating-toolbar'">
            <DocsTitle title="FloatingToolbar 浮动工具栏" desc="固定在视口侧边的浮动工具按钮组。" />
            <DemoBlock title="CpFloatingToolbar" description="右侧浮动工具栏，点击按钮查看效果">
              <div style="position:relative;height:200px;border:1px solid var(--cp-border-base)">
                <div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--cp-text-muted);font-size:12px">内容区域（工具栏固定在右侧）</div>
                <CpFloatingToolbar position="right">
                  <CpToolButton label="编辑" @click="() => {}">E</CpToolButton>
                  <CpToolButton label="删除" @click="() => {}">D</CpToolButton>
                  <CpToolButton label="分享" @click="() => {}">S</CpToolButton>
                </CpFloatingToolbar>
              </div>
              <template #code><DemoCode :code="codes.floatingToolbar" /></template>
            </DemoBlock>
          </template>

          <template v-if="activeItem === 'toc-panel'">
            <DocsTitle title="TocPanel 目录面板" desc="侧边目录导航面板。" />
            <DemoBlock title="CpTocPanel" description="v-model 控制显隐，chapters 传入标题列表">
              <CyberButton variant="primary" @click="showToc = true">打开目录</CyberButton>
              <CpTocPanel v-model="showToc" :chapters="tocChapters" :active-index="tocActive" title="CONTENTS" @update:active-index="tocActive = $event" />
              <p style="color:var(--cp-text-muted);font-size:12px;margin-top:8px">当前选中: 第 {{ tocActive + 1 }} 章</p>
              <template #code><DemoCode :code="codes.tocPanel" /></template>
            </DemoBlock>
          </template>

          <!-- ==================== 业务 Business ==================== -->

          <template v-if="activeItem === 'nav-menu'">
            <DocsTitle title="NavMenu 导航菜单" desc="赛博风格导航菜单，保留原网站设计。" />
            <DemoBlock title="Cyber" description="Oswald 字体 + 黄色激活 + 位移阴影 + 发光动画">
              <div style="max-width:300px">
                <CyberNavMenu :items="navMenuItems" :active-index="activeNav" @select="activeNav = $event" />
              </div>
              <template #code><DemoCode :code="codes.navMenu" /></template>
            </DemoBlock>
          </template>

          <template v-if="activeItem === 'blog-card'">
            <DocsTitle title="BlogCard 博客卡片" desc="保留原网站博客卡片设计。" />
            <DemoBlock title="Cyber" description="切角 + 240px 高度 + Oswald 标题">
              <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.5rem">
                <CyberBlogCard title="Neural Interface Protocol" description="探索人类大脑与数字世界的连接协议，深度解析脑机接口的前沿技术突破。" />
                <CyberBlogCard title="Corrupted Data Stream" description="数据流中检测到异常信号，正在进行系统修复..." status="corrupted" />
                <CyberBlogCard title="Cyberpunk Architecture" description="未来城市建筑风格在 UI 设计中的应用与实践。" status="featured" />
              </div>
              <template #code><DemoCode :code="codes.blogCard" /></template>
            </DemoBlock>
          </template>

          <template v-if="activeItem === 'filter-bar'">
            <DocsTitle title="FilterBar 过滤栏" desc="保留原网站过滤按钮设计。" />
            <DemoBlock title="Cyber" description="切角按钮 + 蓝色激活 + clip-path">
              <CyberFilterBar :filters="filterItems" v-model="activeFilter" />
              <div style="margin-top:12px;color:var(--cp-text-muted);font-size:13px">当前选中: {{ activeFilter }}</div>
              <template #code><DemoCode :code="codes.filterBar" /></template>
            </DemoBlock>
          </template>

          <template v-if="activeItem === 'about-modal'">
            <DocsTitle title="AboutModal 档案弹窗" desc="保留原网站用户档案弹窗设计。" />
            <DemoBlock title="Cyber" description="四角装饰 + 头像扫描线 + 数据网格 + 技术栈 + 联络链接">
              <CyberButton variant="primary" @click="showAboutModal = true">打开档案弹窗</CyberButton>
              <CyberAboutModal
                :visible="showAboutModal"
                avatar=""
                nickname="GHOST"
                id="USR_0x7F"
                role="管理员"
                :data-items="aboutDataItems"
                :tech-stack="aboutTechStack"
                :mission="aboutMission"
                :contacts="aboutContacts"
                @close="showAboutModal = false"
              />
              <template #code><DemoCode :code="codes.aboutModal" /></template>
            </DemoBlock>
          </template>

          <template v-if="activeItem === 'article-reader'">
            <DocsTitle title="ArticleReader 文章阅读器" desc="聊天式文章阅读弹窗，首个拥有三风格变体的业务组件。" />
            <DemoBlock title="Cyber" description="战术头部 + 网格背景 + 八角气泡 + 螺栓 + 四角粗框">
              <CyberButton variant="primary" @click="showArticleReader = true">打开 Cyber 阅读器</CyberButton>
              <CyberArticleReader
                :visible="showArticleReader"
                :messages="articleMessages"
                :loading="articleLoading"
                :meta-items="articleMeta"
                @close="showArticleReader = false"
              />
              <template #code><DemoCode :code="codes.articleReader" /></template>
            </DemoBlock>
            <DemoBlock title="SterileCyber" description="约束赛博：深色渐变 + 直角气泡 + 半透明边 + 无网格">
              <CyberButton variant="secondary" @click="showSCArticleReader = true">打开 SterileCyber 阅读器</CyberButton>
              <SterileCyberArticleReader
                :visible="showSCArticleReader"
                :messages="articleMessages"
                :loading="articleLoading"
                :meta-items="articleMeta"
                @close="showSCArticleReader = false"
              />
              <template #code><DemoCode :code="codes.articleReaderSC" /></template>
            </DemoBlock>
            <DemoBlock title="Sterile" description="极简风格：浅色背景 + 卡片气泡 + 圆形头像 + 中性灰度">
              <CyberButton variant="primary" @click="showSterileArticleReader = true">打开 Sterile 阅读器</CyberButton>
              <SterileArticleReader
                :visible="showSterileArticleReader"
                :messages="articleMessages"
                :loading="articleLoading"
                :meta-items="articleMeta"
                @close="showSterileArticleReader = false"
              />
              <template #code><DemoCode :code="codes.articleReaderSterile" /></template>
            </DemoBlock>
          </template>

          <template v-if="activeItem === 'sidebar'">
            <DocsTitle title="Sidebar 侧边栏" desc="通用侧边栏布局容器，内置头部 + 插槽 + 底部。" />
            <DemoBlock title="Cyber" description="380px 宽度，头部 + 默认插槽">
              <div style="height:500px;border:1px solid #333">
                <CyberSidebar header-text="USER_ID: GHOST // NETWATCH_VERIFIED" :width="380">
                  <div style="padding:1rem;color:var(--cp-text-muted);font-size:12px">
                    Sidebar 内容插槽区域
                  </div>
                </CyberSidebar>
              </div>
              <template #code><DemoCode :code="codes.sidebarComp" /></template>
            </DemoBlock>
          </template>

          <template v-if="activeItem === 'not-found'">
            <DocsTitle title="NotFound 404 页面" desc="深色背景 + 霓虹黄错误码 + 可选 glitch + 四角装饰 + 底部条。" />
            <DemoBlock title="基础模式" description="静态霓虹黄错误码 + 猫咪图">
              <div style="position:relative;border:1px solid var(--cp-border-base);min-height:500px">
                <CyberNotFound
                  code="404"
                  title="页面未找到"
                  description="抱歉，您访问的页面不存在或已被移除。"
                />
              </div>
              <template #code><DemoCode :code="codes.notFound" /></template>
            </DemoBlock>
            <DemoBlock title="自定义错误码 + Glitch" description="支持任意错误码，开启 glitch 动画">
              <div style="position:relative;border:1px solid var(--cp-border-base);min-height:500px">
                <CyberNotFound
                  code="500"
                  title="系统故障"
                  description="服务器检测到严重错误，运维已收到警报。"
                  :glitch="true"
                />
              </div>
              <template #code><DemoCode :code="codes.notFound500" /></template>
            </DemoBlock>
          </template>

          <!-- ==================== 创意工坊 ==================== -->

          <template v-if="activeItem === 'creative-workshop'">
            <DocsTitle title="创意工坊" desc="社区贡献的创意组件展示区。如果你有基于 CpUI 的原创组件，欢迎提交 PR 添加到这里。" />

            <DemoBlock title="贡献规范" description="如何添加你的创意组件">
              <div style="display:flex;flex-direction:column;gap:16px;color:var(--cp-text-secondary);font-size:13px;line-height:1.8;">
                <p>欢迎基于本组件库进行二次创作。如果你开发了新的创意组件，请按以下格式展示：</p>
                <ol style="margin:0;padding-left:20px;">
                  <li>将你的创意组件放入本区域，不干扰原有组件的正常展示</li>
                  <li>在组件下方<strong>单独一行</strong>说明<strong>基于哪个原有组件</strong>扩展，以及这是什么创意</li>
                  <li>在说明下方写上你的 <strong>GitHub 个人主页链接</strong> 和 <strong>名字/昵称</strong></li>
                </ol>
                <p style="margin:8px 0 0;font-family:var(--cp-font-mono);font-size:11px;color:var(--cp-text-muted);">// 示例格式：</p>
                <div style="margin-top:12px;border:1px solid var(--cp-border-dim);background:var(--cp-bg-panel);">
                  <div style="padding:12px 16px;font-family:var(--cp-font-mono);font-size:14px;font-weight:600;color:var(--cp-text-primary);">故障文字</div>
                  <div style="padding:16px;border-top:1px solid var(--cp-border-dim);border-bottom:1px solid var(--cp-border-dim);">
                    <CyberGlitchText text="GLITCH" tag="h2" style="font-size: 36px" />
                  </div>
                  <div style="padding:12px 16px;background:rgba(0,0,0,0.3);font-family:var(--cp-font-mono);font-size:12px;color:var(--cp-text-secondary);line-height:1.7;">
                    <code>&lt;CyberGlitchText text="GLITCH" tag="h2" style="font-size: 36px" /&gt;</code>
                  </div>
                  <div style="display:flex;flex-direction:column;gap:4px;padding:10px 16px;border-top:1px solid var(--cp-border-dim);font-family:var(--cp-font-mono);font-size:11px;color:var(--cp-text-dim);">
                    <span>✨ 基于 CyberGlitchText 的故障文字闪烁效果</span>
                    <div style="width:50%;height:1px;background:var(--cp-border-base);margin:2px auto;"></div>
                    <span>github：<a href="https://github.com/laohe10086/CPUI" target="_blank" style="color:var(--cp-color-secondary);text-decoration:none;">https://github.com/laohe10086/CPUI</a> by：老何10086</span>
                  </div>
                </div>
              </div>
            </DemoBlock>

            <DemoBlock title="暂无内容" description="等待第一位贡献者">
              <div style="display:flex;flex-direction:column;gap:12px;align-items:center;justify-content:center;padding:40px 0;color:var(--cp-text-dim);">
                <CpLogo text="EMPTY" size="md" />
                <p style="font-family:var(--cp-font-mono);font-size:13px;">暂无创意组件，期待你的贡献</p>
                <a href="https://github.com/laohe10086/CPUI" target="_blank" rel="noopener" style="color:var(--cp-color-secondary);font-family:var(--cp-font-mono);font-size:11px;text-decoration:none;border-bottom:1px solid var(--cp-color-secondary);">
                  前往 GitHub 提交你的创意 →
                </a>
              </div>
            </DemoBlock>
          </template>

          <!-- ==================== 布局演示 ==================== -->

          <template v-if="activeItem === 'index-panel'">
            <DocsTitle title="IndexPanel 索引面板" desc="组合组件演示：搜索 + 过滤 + 卡片网格 + 分页。" />
            <DemoBlock title="完整示例" description="搜索 + 过滤 + 卡片网格 + 分页">
              <section class="index-demo">
                <div class="index-demo__corner index-demo__corner--tl" />
                <div class="index-demo__corner index-demo__corner--tr" />
                <div class="index-demo__corner index-demo__corner--bl" />
                <div class="index-demo__corner index-demo__corner--br" />
                <header class="index-demo__header">
                  <div>
                    <p class="index-demo__label">NODE // 04</p>
                    <h2 class="index-demo__title">ARTICLE INDEX</h2>
                    <p class="index-demo__desc">最新的观测日志在此列队，支持以标签、关键字快速定位。</p>
                  </div>
                  <div class="index-demo__search">
                    <input :value="indexSearch" class="index-demo__search-input" type="text" placeholder="输入关键字..." @input="indexSearch = ($event.target as HTMLInputElement).value" />
                    <button v-if="indexSearch" class="index-demo__search-clear" type="button" @click="indexSearch = ''">CLEAR</button>
                  </div>
                </header>
                <CyberFilterBar :filters="indexFilters" :model-value="indexActiveFilter" @update:model-value="indexActiveFilter = $event" />
                <p class="index-demo__result">SCAN RESULT // {{ String(indexTotal).padStart(2, '0') }} LOG</p>
                <div v-if="indexTotal > 0" class="index-demo__grid">
                  <CyberBlogCard
                    v-for="item in indexDisplayCards"
                    :key="item.title"
                    :title="item.title"
                    :description="item.description"
                    :status="item.status"
                  />
                </div>
                <div v-else class="index-demo__empty">
                  <p>NO_DATA_FOUND</p>
                  <p>// 搜索条件无匹配结果</p>
                </div>
                <div v-if="indexTotalPages > 1" class="index-demo__pagination">
                  <CyberPagination :current-page="indexPage" :total-pages="indexTotalPages" @update:current-page="indexPage = $event" />
                </div>
              </section>
              <template #code><DemoCode :code="codes.indexPanel" /></template>
            </DemoBlock>
          </template>

          <template v-if="activeItem === 'topnav'">
            <DocsTitle title="TopNav 顶栏" desc="无侧边栏时的顶部导航，深色底 + 简洁链接。" />
            <DemoBlock title="设计稿" description="48px 薄条 + Oswald Logo + Share Tech Mono 导航 + 主题色底线">
              <header class="topnav-v3">
                <CpLogo text="CpUI" size="sm" />
                <nav class="topnav-v3__nav">
                  <a class="topnav-v3__link topnav-v3__link--active">首页</a>
                  <a class="topnav-v3__link">文章</a>
                  <a class="topnav-v3__link">友链</a>
                  <a class="topnav-v3__link">关于</a>
                </nav>
                <div class="topnav-v3__right">
                  <CpStatusLed status="online" :pulse="true" size="sm" />
                </div>
                <div class="topnav-v3__line" />
              </header>
              <template #code><DemoCode :code="codes.topnav" /></template>
            </DemoBlock>
          </template>

          <template v-if="activeItem === 'sidebar'">
            <DocsTitle title="Sidebar 侧边栏" desc="原站风格侧边栏，380px 宽 + 黄色粗边框 + 右下斜切。" />
            <DemoBlock title="Cyber" description="原站风格：深色面板 + 4px 黄色右边框 + clip-path 斜切">
              <aside class="sidebar-demo">
                <div class="sidebar-demo__header">USER_ID: GHOST // NETWATCH_VERIFIED</div>
                <div class="sidebar-demo__content">
                  <CyberProfileCard nickname="GHOST" level="42" bio="Netrunner / Full-stack Developer" />
                  <CyberNavMenu :items="layoutNavItems" :active-index="layoutActiveNav" @select="layoutActiveNav = $event" />
                  <div class="sidebar-demo__stats">
                    <CyberStatsGrid :stats="layoutStats" />
                  </div>
                  <div class="sidebar-demo__footer">
                    <CpDigitalClock :show-seconds="true" />
                    <span class="sidebar-demo__copyright">© 2025 CpUI</span>
                  </div>
                </div>
              </aside>
              <template #code><DemoCode :code="codes.sidebar" /></template>
            </DemoBlock>
          </template>

        </main>
      </div>
    </div>
  </CpThemeProvider>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import DemoBlock from './components/DemoBlock.vue'
import DemoCode from './components/DemoCode.vue'
import {
  CpThemeProvider,
  CyberButton, CyberCard, CyberInput, CyberTag, CyberBadge,
  CyberBracketLabel, CyberPanel, CyberModal, CyberPagination,
  CyberAvatar, CyberProgressBar, CyberCategoryTabs, CyberStatsGrid,
  CyberTerminal, CyberChatBubble,
  CyberHeading,
  SterileCyberButton, SterileCyberCard, SterileCyberInput, SterileCyberTag, SterileCyberBadge,
  SterileCyberBracketLabel, SterileCyberPanel, SterileCyberModal, SterileCyberPagination,
  SterileCyberAvatar, SterileCyberProgressBar, SterileCyberCategoryTabs, SterileCyberStatsGrid,
  SterileCyberTerminal, SterileCyberChatBubble,
  SterileCyberHeading,
  SterileButton, SterileCard, SterileInput, SterileTag, SterileBadge,
  SterileBracketLabel, SterilePanel, SterileModal, SterilePagination,
  SterileAvatar, SterileProgressBar, SterileCategoryTabs, SterileStatsGrid,
  SterileTerminal, SterileChatBubble,
  SterileHeading,
  BrutalButton, BrutalCard, BrutalInput, BrutalTag, BrutalBadge,
  BrutalBracketLabel, BrutalProgressBar, BrutalHeading,
  BrutalAvatar, BrutalPanel, BrutalModal, BrutalStatsGrid,
  BrutalPagination, BrutalCategoryTabs, BrutalTerminal, BrutalChatBubble,
  BlueprintButton, BlueprintCard, BlueprintInput, BlueprintTag, BlueprintBadge,
  BlueprintBracketLabel, BlueprintProgressBar, BlueprintHeading,
  BlueprintAvatar, BlueprintPanel, BlueprintModal, BlueprintStatsGrid,
  BlueprintPagination, BlueprintCategoryTabs, BlueprintTerminal, BlueprintChatBubble,
  NoirButton, NoirCard, NoirInput, NoirTag, NoirBadge,
  NoirBracketLabel, NoirProgressBar, NoirHeading,
  NoirAvatar, NoirPanel, NoirModal, NoirStatsGrid,
  NoirPagination, NoirCategoryTabs, NoirTerminal, NoirChatBubble,
  ModernButton, ModernCard, ModernInput, ModernTag, ModernBadge,
  ModernBracketLabel, ModernProgressBar, ModernHeading,
  ModernTooltip, ModernChip, ModernSwitch, ModernSelect,
  CyberModernButton, CyberModernCard, CyberModernInput, CyberModernTag, CyberModernBadge,
  CyberModernBracketLabel, CyberModernProgressBar, CyberModernHeading,
  CyberModernGlitch, CyberModernHologram, CyberModernScanLine, CyberModernPulse,
  CyberGlitchText, CyberDecipherText, CyberScanLine,
  CyberCornerBrackets, CyberLabelBar, CyberMonitorEye,
  CyberBootAnimation,
  CyberDisconnect,
  CyberNavMenu, CyberBlogCard, CyberProfileCard,
  CyberFilterBar, CyberAboutModal, CyberArticleReader, SterileCyberArticleReader, SterileArticleReader,
  CyberNotFound,
  CyberSidebar,
  CpLogo, CpLogoTvOff, CpLogoNeon, CpLogoFlicker, CpLogoScanline, CpLogoDecipher, CpBackground, CpGridLayer, CpStatusLed,
  CpDigitalClock, CpTypingIndicator, CpHudStrip,
  CpFloatingToolbar, CpToolButton, CpTocPanel,
} from '@cp-ui/index'

const currentTheme = ref('sterile-cyber')
const themeInputVal = ref('')
const themeShowcaseList = [
  { value: 'cyberpunk', label: '赛博朋克' },
  { value: 'sterile-cyber', label: '无菌赛博' },
  { value: 'neon-noir', label: '霓虹黑' },
  { value: 'blueprint', label: '蓝图' },
  { value: 'brutal', label: '终端粗野' },
  { value: 'sterile-dark', label: '无菌暗色' },
  { value: 'sterile-light', label: '无菌亮色' },
]
const bgVariant = ref<'mesh' | 'glow' | 'minimal' | 'neon'>('neon')
const showGrid = ref(true)
const gridPattern = ref<'dot' | 'line' | 'blueprint'>('line')
const showToc = ref(false)
const tocActive = ref(0)
const tocChapters = ['系统初始化', '连接协议', '数据同步', '安全审计', '日志归档']
const topNavActive = ref(0)
const topNavThemes = [
  { value: 'cyberpunk', label: '赛博朋克' },
  { value: 'sterile-cyber', label: '无菌赛博' },
  { value: 'sterile-light', label: '无菌亮色' },
]
const activeItem = ref('quickstart')
const inputVal = ref('')
const showCyberModal = ref(false)
const showSCModal = ref(false)
const showSterileModal = ref(false)
const showBlueprintModal = ref(false)
const showBrutalModal = ref(false)
const showNoirModal = ref(false)
const currentPage = ref(3)
const activeCat = ref('all')
const activeNav = ref(0)
const activeFilter = ref('all')
const showAboutModal = ref(false)
const showArticleReader = ref(false)
const showSCArticleReader = ref(false)
const bootAnimRef = ref<InstanceType<typeof CyberBootAnimation> | null>(null)
const showSterileArticleReader = ref(false)
const articleLoading = ref(false)
const indexSearch = ref('')
const indexActiveFilter = ref('all')
const indexPage = ref(1)
const indexLoading = ref(false)
const layoutActiveNav = ref(0)

const indexFilters = [
  { label: 'ALL', value: 'all' },
  { label: 'VUE', value: 'vue' },
  { label: 'CSS', value: 'css' },
  { label: 'RUST', value: 'rust' },
]

const layoutNavItems = [
  { text: '01 // 主页', icon: '>' },
  { text: '02 // 文章', icon: '+' },
  { text: '03 // 项目', icon: '+' },
  { text: '04 // 运行志', icon: '三' },
  { text: '05 // 断开连接', icon: 'X', danger: true },
]

const layoutStats = [
  { label: '今日访客', value: '1,247', trend: 'up' as const, trendValue: '+12%', dynamic: true },
  { label: '当前访客', value: '03', trend: 'stable' as const, dynamic: true },
  { label: '数据碎片', value: '42', trend: 'up' as const },
  { label: 'LATENCY', value: '142ms', trend: 'down' as const, trendValue: '-3%', dynamic: true },
]

const layoutCards = [
  { title: 'Neural Interface Protocol', description: '探索人类大脑与数字世界的连接协议。', status: 'normal' },
  { title: 'Corrupted Data Stream', description: '数据流中检测到异常信号...', status: 'corrupted' },
  { title: 'Cyberpunk Architecture', description: '未来城市建筑风格在 UI 设计中的应用。', status: 'featured' },
]

const allIndexCards = [
  { title: 'Neural Interface Protocol', description: '探索人类大脑与数字世界的连接协议，深度解析脑机接口的前沿技术突破。', status: 'normal', tags: ['vue', 'css'] },
  { title: 'Corrupted Data Stream', description: '数据流中检测到异常信号，正在进行系统修复...', status: 'corrupted', tags: ['rust'] },
  { title: 'Cyberpunk Architecture', description: '未来城市建筑风格在 UI 设计中的应用与实践。', status: 'featured', tags: ['css'] },
  { title: 'Quantum Rendering Engine', description: '基于量子计算的下一代渲染引擎原型设计。', status: 'normal', tags: ['vue', 'rust'] },
  { title: 'Glitch Aesthetics Guide', description: '故障美学的视觉语言与前端实现方案。', status: 'normal', tags: ['css'] },
  { title: 'Holographic UI Patterns', description: '全息投影界面模式在 Web 端的降级实现策略。', status: 'featured', tags: ['vue'] },
]

const indexTotal = computed(() => {
  let filtered = allIndexCards
  if (indexActiveFilter.value !== 'all') {
    filtered = filtered.filter(c => c.tags.includes(indexActiveFilter.value))
  }
  if (indexSearch.value) {
    const kw = indexSearch.value.toLowerCase()
    filtered = filtered.filter(c => c.title.toLowerCase().includes(kw) || c.description.toLowerCase().includes(kw))
  }
  return filtered.length
})
const indexTotalPages = computed(() => Math.max(1, Math.ceil(indexTotal.value / 4)))
const indexDisplayCards = computed(() => {
  let filtered = allIndexCards
  if (indexActiveFilter.value !== 'all') {
    filtered = filtered.filter(c => c.tags.includes(indexActiveFilter.value))
  }
  if (indexSearch.value) {
    const kw = indexSearch.value.toLowerCase()
    filtered = filtered.filter(c => c.title.toLowerCase().includes(kw) || c.description.toLowerCase().includes(kw))
  }
  return filtered.slice(0, 4)
})

const navMenuItems = [
  { text: '主页', icon: '>' },
  { text: '文章', icon: '>' },
  { text: '项目', icon: '>' },
  { text: '运行志', icon: '>', danger: true },
]

const filterItems = [
  { label: 'ALL', value: 'all' },
  { label: 'VUE', value: 'vue' },
  { label: 'CSS', value: 'css' },
  { label: 'RUST', value: 'rust' },
]

const aboutDataItems = [
  { label: '文章', value: '42' },
  { label: '项目', value: '7' },
  { label: '运行天数', value: '365' },
  { label: '访问量', value: '12.4K' },
]

const aboutTechStack = ['Vue', 'TypeScript', 'Rust', 'Node.js', 'SCSS', 'Vite']

const aboutMission = [
  '探索前端技术的无限可能',
  '构建优雅且高效的数字体验',
  '在代码与设计之间寻找平衡',
]

const aboutContacts = [
  { label: 'GitHub', url: '#', type: 'github' },
  { label: 'Email', url: '#', type: 'email' },
  { label: 'Bilibili', url: '#', type: 'bilibili' },
]

const articleMeta = [
  { label: '索引编号', value: 'ART_001' },
  { label: '档案标题', value: '第一次发文章' },
  { label: '加密协议', value: 'AES-256-GCM' },
  { label: '当前状态', value: '数据包解密中...' },
]

const articleMessages = [
  { role: 'author' as const, type: 'text' as const, content: '这是第一篇测试文章，系统初始化完成。', time: '14:30:00' },
  { role: 'system' as const, type: 'text' as const, content: 'DATA_PACKET_RECEIVED // 校验通过', time: '14:30:01', checksum: '0xA1B2C3' },
  { role: 'author' as const, type: 'text' as const, content: '前端开发的世界充满了无限可能，Vue 3 的组合式 API 让代码更加清晰和可维护。', time: '14:30:05' },
  { role: 'author' as const, type: 'text' as const, content: '赛博朋克不仅仅是一种美学风格，更是一种对技术与人性的思考。', time: '14:30:10' },
]

const categories = [
  {
    key: 'quickstart', label: '快速开始 QUICKSTART',
    items: [
      { key: 'quickstart', label: '安装与使用' },
    ],
  },
  {
    key: 'theme', label: '主题展示 THEME',
    items: [
      { key: 'theme-showcase', label: '九主题对比' },
    ],
  },
  {
    key: 'components', label: '组件 COMPONENTS',
    items: [
      { key: 'button', label: 'Button 按钮' },
      { key: 'heading', label: 'Heading 标题' },
      { key: 'input', label: 'Input 输入框' },
      { key: 'tag', label: 'Tag 标签' },
      { key: 'badge', label: 'Badge 徽章' },
      { key: 'bracket-label', label: 'BracketLabel 括号标签' },
      { key: 'card', label: 'Card 卡片' },
      { key: 'avatar', label: 'Avatar 头像' },
      { key: 'panel', label: 'Panel 面板' },
      { key: 'modal', label: 'Modal 弹窗' },
      { key: 'progress', label: 'ProgressBar 进度条' },
      { key: 'stats-grid', label: 'StatsGrid 数据面板' },
      { key: 'pagination', label: 'Pagination 分页' },
      { key: 'category-tabs', label: 'CategoryTabs 分类标签' },
      { key: 'terminal', label: 'Terminal 终端' },
      { key: 'chat-bubble', label: 'ChatBubble 聊天气泡' },
    ],
  },
  {
    key: 'cyber', label: '赛博专属 CYBER',
    items: [
      { key: 'glitch-text', label: 'GlitchText 故障文字' },
      { key: 'decipher-text', label: 'DecipherText 解码文字' },
      { key: 'cyber-decor', label: '装饰组件' },
      { key: 'disconnect', label: 'Disconnect 断开连接' },
    ],
  },
  {
    key: 'blueprint-zone', label: '蓝图专属 BLUEPRINT',
    items: [
      { key: 'blueprint-components', label: '蓝图组件' },
    ],
  },
  {
    key: 'brutal-zone', label: '终端粗野专属 BRUTAL',
    items: [
      { key: 'brutal-components', label: '粗野组件' },
    ],
  },
  {
    key: 'noir-zone', label: '霓虹黑专属 NOIR',
    items: [
      { key: 'noir-components', label: '霓虹组件' },
    ],
  },
  {
    key: 'sterile-zone', label: '无菌专属 STERILE',
    items: [
      { key: 'sterile-components', label: '无菌组件' },
    ],
  },
  {
    key: 'modern-zone', label: '现代专属 MODERN',
    items: [
      { key: 'modern-components', label: '现代组件' },
    ],
  },
  {
    key: 'cyber-modern-zone', label: '赛博现代专属 CYBER-MODERN',
    items: [
      { key: 'cyber-modern-components', label: '融合组件' },
    ],
  },
  {
    key: 'shared', label: '共享组件 SHARED',
    items: [
      { key: 'logo', label: 'Logo 品牌标识' },
      { key: 'shared-utils', label: 'StatusLed / Clock / Typing' },
      { key: 'background', label: 'Background / GridLayer' },
      { key: 'hud-strip', label: 'HudStrip 状态条' },
      { key: 'floating-toolbar', label: 'FloatingToolbar 浮动工具栏' },
      { key: 'toc-panel', label: 'TocPanel 目录面板' },
    ],
  },
  {
    key: 'business', label: '业务 BUSINESS',
    items: [
      { key: 'nav-menu', label: 'NavMenu 导航菜单' },
      { key: 'blog-card', label: 'BlogCard 博客卡片' },
      { key: 'filter-bar', label: 'FilterBar 过滤栏' },
      { key: 'about-modal', label: 'AboutModal 档案弹窗' },
      { key: 'article-reader', label: 'ArticleReader 文章阅读器' },
      { key: 'sidebar', label: 'Sidebar 侧边栏' },
      { key: 'not-found', label: 'NotFound 404 页面' },
    ],
  },
  {
    key: 'layout', label: '布局演示 LAYOUT',
    items: [
      { key: 'index-panel', label: 'IndexPanel 索引面板' },
      { key: 'topnav', label: 'TopNav 顶栏' },
    ],
  },
  {
    key: 'animations', label: '开机动画 ANIMATIONS',
    items: [
      { key: 'boot-animation', label: 'BootAnimation 开机动画' },
    ],
  },
  {
    key: 'creative', label: '创意工坊 CREATIVE',
    items: [
      { key: 'creative-workshop', label: '创意组件区' },
    ],
  },
]

const currentCategory = computed(() => {
  for (const cat of categories) {
    if (cat.items.some(i => i.key === activeItem.value)) return cat
  }
  return categories[0]
})

const catTabs = [
  { label: '全部', value: 'all', count: 42 },
  { label: 'Vue', value: 'vue', count: 18 },
  { label: 'CSS', value: 'css', count: 12 },
]
const statsData = [
  { value: '2,041', label: '今日访客', trend: 'up' as const, trendValue: '+12%' },
  { value: '7', label: '现在访客', highlight: true },
  { value: '3,540', label: '数据分片', trend: 'up' as const, trendValue: '+5%' },
  { value: '142ms', label: '延迟时间', trend: 'down' as const, trendValue: '-3%', dynamic: true },
]
const installCmd = 'npm install @yuanfangmao/cp-ui'
const copyInstallText = ref('复制')
function copyInstall() {
  navigator.clipboard.writeText(installCmd).then(() => {
    copyInstallText.value = '✓ 已复制'
    setTimeout(() => { copyInstallText.value = '复制' }, 1500)
  })
}
const globalImportCode = `import { createApp } from 'vue'
import CpUI from '@yuanfangmao/cp-ui'
import '@yuanfangmao/cp-ui/dist/style.css'

const app = createApp(App)
app.use(CpUI)
app.mount('#app')`
const treeShakingCode = `import { CyberButton, CyberTag, CpThemeProvider } from '@yuanfangmao/cp-ui'
import '@yuanfangmao/cp-ui/dist/style.css'

// 在组件中使用
<template>
  <CpThemeProvider theme="cyberpunk">
    <CyberButton variant="primary">点击我</CyberButton>
    <CyberTag>标签</CyberTag>
  </CpThemeProvider>
</template>`
const usageCode = `<template>
  <CpThemeProvider theme="cyberpunk">
    <CyberButton variant="primary">Primary</CyberButton>
    <CyberButton variant="secondary">Secondary</CyberButton>
    <CyberTag>标签</CyberTag>
    <CyberBadge text="42" />
  </CpThemeProvider>
</template>`
const themeCode = `<!-- 切换主题只需改 theme 属性 -->
<CpThemeProvider theme="cyberpunk">    <!-- 赛博朋克 -->
<CpThemeProvider theme="sterile-cyber"> <!-- 无菌赛博 -->
<CpThemeProvider theme="neon-noir">     <!-- 霓虹黑 -->
<CpThemeProvider theme="blueprint">     <!-- 蓝图 -->
<CpThemeProvider theme="brutal">       <!-- 终端粗野 -->
<CpThemeProvider theme="sterile-dark">  <!-- 无菌暗色 -->
<CpThemeProvider theme="sterile-light"> <!-- 无菌亮色 -->`

const terminalEntries = [
  { message: 'System initialized', type: 'system' as const, timestamp: '14:30:00', source: 'INIT' },
  { message: 'Migration 042 applied', type: 'success' as const, timestamp: '14:30:18', source: 'DB' },
  { message: 'Cache miss', type: 'warning' as const, timestamp: '14:31:55', source: 'CACHE' },
]

const codes = {
  headingCyber: `<CyberHeading>默认标题</CyberHeading>
<CyberHeading line-color="var(--cp-color-danger)" text-color="var(--cp-color-danger)">自定义颜色</CyberHeading>
<CyberHeading :neon="true">霓虹发光</CyberHeading>
<CyberHeading :rgb-split="true">RGB 色差</CyberHeading>
<CyberHeading :glitched="true">Glitch 抖动</CyberHeading>
<CyberHeading :line-pulse="true">横线脉冲</CyberHeading>
<CyberHeading :line-glow="true">横线发光</CyberHeading>`,
  headingSC: `<SterileCyberHeading>默认标题</SterileCyberHeading>
<SterileCyberHeading :neon="true">霓虹发光</SterileCyberHeading>
<SterileCyberHeading :line-pulse="true">横线脉冲</SterileCyberHeading>`,
  headingSterile: `<SterileHeading>默认标题</SterileHeading>
<SterileHeading :underline="true">带下划线</SterileHeading>
<SterileHeading :underline="true" :line-pulse="true">横线脉冲</SterileHeading>`,
  logo: `<CpLogo text="CpUI" size="lg" />
<CpLogo text="CpUI" size="md" :bordered="true" />
<CpLogo text="YUANFANGMAO" size="md" :bordered="true" />`,
  logoTvOff: `<CpLogoTvOff text="CpUI" size="lg" />
<CpLogoTvOff text="CpUI" size="md" />`,
  logoNeon: `<CpLogoNeon text="CpUI" size="lg" />
<CpLogoNeon text="CpUI" size="md" />`,
  logoFlicker: `<CpLogoFlicker text="CpUI" size="lg" />
<CpLogoFlicker text="YUANFANGMAO" size="md" />`,
  logoScanline: `<CpLogoScanline text="CpUI" size="lg" />
<CpLogoScanline text="CpUI" size="md" />`,
  logoDecipher: `<CpLogoDecipher text="CpUI" size="lg" />
<CpLogoDecipher text="CpUI" size="md" />`,
  buttonCyber: `<CyberButton variant="primary" size="md">PRIMARY</CyberButton>
<CyberButton variant="secondary">SECONDARY</CyberButton>
<CyberButton variant="danger">DANGER</CyberButton>
<CyberButton variant="ghost">GHOST</CyberButton>
<CyberButton variant="primary" size="sm">SM</CyberButton>
<CyberButton variant="primary" size="md">MD</CyberButton>
<CyberButton variant="primary" size="lg">LG</CyberButton>
<CyberButton variant="primary" :loading="true">LOAD</CyberButton>
<CyberButton variant="primary" disabled>DISABLED</CyberButton>`,
  buttonSC: `<SterileCyberButton variant="primary">PRIMARY</SterileCyberButton>
<SterileCyberButton variant="secondary">SECONDARY</SterileCyberButton>
<SterileCyberButton variant="danger">DANGER</SterileCyberButton>
<SterileCyberButton variant="ghost">GHOST</SterileCyberButton>`,
  buttonSterile: `<SterileButton variant="primary">PRIMARY</SterileButton>
<SterileButton variant="secondary">SECONDARY</SterileButton>
<SterileButton variant="danger">DANGER</SterileButton>
<SterileButton variant="ghost">GHOST</SterileButton>`,
  buttonIrregular: `<CyberButton variant="primary" shape="irregular" size="md">PRIMARY</CyberButton>
<CyberButton variant="secondary" shape="irregular">SECONDARY</CyberButton>
<CyberButton variant="danger" shape="irregular">DANGER</CyberButton>
<CyberButton variant="ghost" shape="irregular">GHOST</CyberButton>
<CyberButton variant="primary" shape="irregular" size="sm">SM</CyberButton>
<CyberButton variant="primary" shape="irregular" size="md">MD</CyberButton>
<CyberButton variant="primary" shape="irregular" size="lg">LG</CyberButton>
<CyberButton variant="primary" shape="irregular" :loading="true">LOAD</CyberButton>
<CyberButton variant="primary" shape="irregular" disabled>DISABLED</CyberButton>`,
  tagCyber: `<CyberTag variant="primary">PRIMARY</CyberTag>
<CyberTag variant="secondary">SECONDARY</CyberTag>
<CyberTag variant="danger">DANGER</CyberTag>
<CyberTag variant="success" closable>SUCCESS</CyberTag>`,
  tagSC: `<SterileCyberTag variant="primary">PRIMARY</SterileCyberTag>
<SterileCyberTag variant="danger">DANGER</SterileCyberTag>`,
  tagSterile: `<SterileTag variant="primary">PRIMARY</SterileTag>
<SterileTag variant="danger">DANGER</SterileTag>`,
  tagRegular: `<CyberTag variant="default" shape="regular">DEFAULT</CyberTag>
<CyberTag variant="primary" shape="regular">PRIMARY</CyberTag>
<CyberTag variant="secondary" shape="regular">SECONDARY</CyberTag>
<CyberTag variant="danger" shape="regular">DANGER</CyberTag>
<CyberTag variant="success" shape="regular" closable>SUCCESS</CyberTag>`,
  badge: `<!-- Cyber -->
<CyberBadge variant="primary">ONLINE</CyberBadge>
<CyberBadge variant="danger">ERROR</CyberBadge>

<!-- SterileCyber -->
<SterileCyberBadge variant="primary">ONLINE</SterileCyberBadge>

<!-- Sterile -->
<SterileBadge variant="primary">ONLINE</SterileBadge>`,
  badgeRegular: `<CyberBadge variant="primary" shape="regular">ONLINE</CyberBadge>
<CyberBadge variant="danger" shape="regular">ERROR</CyberBadge>
<CyberBadge variant="success" shape="regular">OK</CyberBadge>`,
  bracket: `<CyberBracketLabel text="DEFAULT" />
<CyberBracketLabel text="ACCENT" variant="accent" />
<CyberBracketLabel text="DANGER" variant="danger" />

<SterileCyberBracketLabel text="ACCENT" variant="accent" />
<SterileBracketLabel text="DEFAULT" />`,
  inputCyber: `<CyberInput v-model="value" placeholder="> 输入..." />
<CyberInput v-model="value" :clearable="true" />
<CyberInput v-model="value" :disabled="true" />`,
  inputSC: `<SterileCyberInput v-model="value" placeholder="输入..." />
<SterileCyberInput v-model="value" :disabled="true" />`,
  inputSterile: `<SterileInput v-model="value" placeholder="输入..." />
<SterileInput v-model="value" :disabled="true" />`,
  inputRegular: `<CyberInput v-model="value" placeholder="> 输入..." shape="regular" />
<CyberInput v-model="value" :clearable="true" shape="regular" />
<CyberInput v-model="value" :disabled="true" shape="regular" />`,
  card: `<CyberCard title="CYBER" shape="irregular" :hoverable="true">
  <p>不规则 + 发光</p>
</CyberCard>

<SterileCyberCard title="SC" :hoverable="true">
  <p>直角 + 克制发光</p>
</SterileCyberCard>

<SterileCard title="STERILE" :hoverable="true">
  <p>直角 + 无发光</p>
</SterileCard>`,
  cardRegular: `<CyberCard title="CYBER" shape="regular" :hoverable="true">
  <p>规则矩形 + 发光</p>
</CyberCard>`,
  avatar: `<CyberAvatar size="lg" :scanline="true" status="online" :status-pulse="true" />
<SterileCyberAvatar size="md" id="USER_01" />
<SterileAvatar size="md" id="USER_01" />`,
  avatarRegular: `<CyberAvatar size="sm" shape="regular" id="SM" />
<CyberAvatar size="md" shape="regular" :scanline="true" id="MD" />
<CyberAvatar size="lg" shape="regular" :scanline="true" status="online" :status-pulse="true" />`,
  stats: `<CyberStatsGrid :stats="statsData" />
<SterileCyberStatsGrid :stats="statsData" />
<SterileStatsGrid :stats="statsData" />`,
  statsScanline: `<CyberStatsGrid :stats="statsData" :scanline="true" />

<!-- statsData -->
const statsData = [
  { value: '12,847', label: 'VISITORS', trend: 'up', trendValue: '+12%' },
  { value: '99.97%', label: 'UPTIME', trend: 'stable' },
]`,
  terminal: `<CyberTerminal
  title="SYSTEM.LOG"
  :entries="entries"
  status-state="online"
  status-text="ACTIVE"
  memory="2.1GB"
  uptime="14d"
/>`,
  chat: `<CyberChatBubble
  direction="left"
  variant="system"
  header="SYSTEM"
  tag="AUTO"
  timestamp="14:32:07"
>
  Neural link established.
</CyberChatBubble>

<CyberChatBubble direction="right" header="USER">
  Response message.
</CyberChatBubble>`,
  panel: `<CyberPanel title="SYSTEM" label="monitor" shape="irregular">
  <slot />
</CyberPanel>

<SterileCyberPanel title="SC PANEL" label="monitor">
  <slot />
</SterileCyberPanel>`,
  panelRegular: `<CyberPanel title="SYSTEM" label="monitor" shape="regular">
  <slot />
</CyberPanel>`,
  paginationCyber: `<CyberPagination
  :current-page="page"
  :total-pages="12"
  @update:current-page="page = $event"
/>`,
  paginationRegular: `<CyberPagination
  shape="regular"
  :current-page="page"
  :total-pages="12"
  @update:current-page="page = $event"
/>`,
  paginationSC: `<SterileCyberPagination
  :current-page="page"
  :total-pages="12"
  @update:current-page="page = $event"
/>

<SterilePagination
  :current-page="page"
  :total-pages="12"
  @update:current-page="page = $event"
/>`,
  catTabsCyber: `<CyberCategoryTabs :tabs="tabs" v-model="active" />

const tabs = [
  { label: '全部', value: 'all', count: 42 },
  { label: 'Vue', value: 'vue', count: 18 },
]`,
  catTabsRegular: `<CyberCategoryTabs shape="regular" :tabs="tabs" v-model="active" />

const tabs = [
  { label: '全部', value: 'all', count: 42 },
  { label: 'Vue', value: 'vue', count: 18 },
]`,
  catTabsSC: `<SterileCyberCategoryTabs :tabs="tabs" v-model="active" />

<SterileCategoryTabs :tabs="tabs" v-model="active" />

const tabs = [
  { label: '全部', value: 'all', count: 42 },
  { label: 'Vue', value: 'vue', count: 18 },
]`,
  modal: `<CyberModal v-model="show" size="md">
  <h3>CYBER.MODAL</h3>
  <p>弹窗内容</p>
</CyberModal>

<SterileCyberModal v-model="show" size="md">
  <h3>SC.MODAL</h3>
</SterileCyberModal>

<SterileModal v-model="show" size="md">
  <h3>Sterile Modal</h3>
</SterileModal>`,
  modalRegular: `<CyberButton variant="primary" shape="regular" @click="show = true">
  Cyber Regular Modal
</CyberButton>`,
  progress: `<CyberProgressBar :value="72" :height="4" />
<CyberProgressBar :value="45" variant="primary" :animated="true" />
<CyberProgressBar :value="23" variant="danger" />`,
  glitchText: `<CyberGlitchText text="WAKE UP" tag="h2" style="font-size: 36px" />
<CyberGlitchText text="SYSTEM BREACH" tag="p" />`,
  glitchHero: `<!-- Hero 标题：Oswald + 大字号 -->
<CyberGlitchText
  text="WAKE THE F*** UP"
  tag="h1"
  font-family="Oswald, sans-serif"
  font-size="5rem"
/>
<!-- 带 pulse 呼吸发光 -->
<CyberGlitchText
  text="NEURAL LINK"
  tag="h2"
  font-family="Oswald, sans-serif"
  font-size="3rem"
  :pulse="true"
/>`,
  glitchIntensity: `<CyberGlitchText text="SUBTLE" glitch-intensity="low" />
<CyberGlitchText text="DEFAULT" />
<CyberGlitchText text="INTENSE" glitch-intensity="high" />`,
  decipherText: `<CyberDecipherText text="ACCESS GRANTED" :speed="40" />`,
  cornerBrackets: `<CyberCornerBrackets>
  <div style="padding: 24px">Content</div>
</CyberCornerBrackets>`,
  scanLine: `<CyberScanLine :opacity="0.06">
  <span>Overlay content</span>
</CyberScanLine>`,
  decorMix: `<CyberLabelBar text="DATA_STREAM" />
<CyberMonitorEye status="online" style="width: 32px; height: 32px" />
<CyberMonitorEye status="scanning" style="width: 32px; height: 32px" />`,
  disconnect: `<CyberDisconnect />`,
  bootAnimation: `<!-- 自动播放（每会话只播一次） -->
<CyberBootAnimation title="INITIALIZING NEURAL LINK..." />

<!-- 手动触发 -->
<CyberBootAnimation
  ref="bootAnim"
  title="自定义标题"
  system-info="BIOS DATE: 2077.08.20 // VER 550W"
  :duration="2200"
  :auto-start="false"
  @complete="onBootComplete"
/>`,
  blueprintButton: `<CpThemeProvider theme="blueprint">
  <BlueprintButton variant="primary">Primary</BlueprintButton>
  <BlueprintButton variant="secondary">Secondary</BlueprintButton>
  <BlueprintButton variant="danger">Danger</BlueprintButton>
</CpThemeProvider>`,
  blueprintHeading: `<BlueprintHeading>MODULE HEADING</BlueprintHeading>`,
  blueprintMeta: `<BlueprintTag>Tag</BlueprintTag>
<BlueprintBadge text="42" />
<BlueprintBracketLabel text="LABEL" />`,
  blueprintCard: `<BlueprintCard title="MODULE">Card 内容</BlueprintCard>
<BlueprintInput v-model="val" placeholder="尺寸标注..." />`,
  blueprintProgress: `<BlueprintProgressBar :value="72" :animated="true" />
<BlueprintProgressBar variant="danger" :value="30" />`,
  brutalButton: `<CpThemeProvider theme="brutal">
  <BrutalButton variant="primary">Primary</BrutalButton>
  <BrutalButton variant="secondary">Secondary</BrutalButton>
  <BrutalButton variant="danger">Danger</BrutalButton>
</CpThemeProvider>`,
  brutalHeading: `<BrutalHeading>SYSTEM READY</BrutalHeading>`,
  brutalMeta: `<BrutalTag>Tag</BrutalTag>
<BrutalBadge text="42" />
<BrutalBracketLabel text="LABEL" />`,
  brutalCard: `<BrutalCard title="module">Card 内容</BrutalCard>
<BrutalInput v-model="val" placeholder="输入命令..." />`,
  brutalProgress: `<BrutalProgressBar :value="72" :animated="true" />
<BrutalProgressBar variant="danger" :value="30" />`,
  noirButton: `<CpThemeProvider theme="neon-noir">
  <NoirButton variant="primary">Primary</NoirButton>
  <NoirButton variant="secondary">Secondary</NoirButton>
  <NoirButton variant="danger">Danger</NoirButton>
</CpThemeProvider>`,
  noirHeading: `<NoirHeading>霓虹标题</NoirHeading>`,
  noirMeta: `<NoirTag>Tag</NoirTag>
<NoirBadge text="42" />
<NoirBracketLabel text="LABEL" />`,
  noirCard: `<NoirCard title="场景">Card 内容</NoirCard>
<NoirInput v-model="val" placeholder="输入框..." />`,
  noirProgress: `<NoirProgressBar :value="72" :animated="true" />
<NoirProgressBar variant="danger" :value="30" />`,
  sterileButton: `<CpThemeProvider theme="sterile-dark">
  <SterileButton variant="primary">Primary</SterileButton>
  <SterileButton variant="secondary">Secondary</SterileButton>
  <SterileButton variant="danger">Danger</SterileButton>
</CpThemeProvider>`,
  sterileHeading: `<SterileHeading>无菌标题</SterileHeading>`,
  sterileMeta: `<SterileTag>Tag</SterileTag>
<SterileBadge text="42" />
<SterileBracketLabel text="LABEL" />`,
  sterileCard: `<SterileCard title="数据">Card 内容</SterileCard>
<SterileInput v-model="val" placeholder="输入框..." />`,
  sterileProgress: `<SterileProgressBar :value="72" :animated="false" />
<SterileProgressBar variant="danger" :value="30" />`,
  shared: `<CpStatusLed status="online" :pulse="true" />
<CpStatusLed status="warning" :pulse="true" />
<CpDigitalClock :show-seconds="true" :glitch="true" />
<CpTypingIndicator />`,
  background: `<CpBackground variant="neon" />
<CpBackground variant="mesh" />
<CpBackground variant="glow" />
<CpBackground variant="minimal" />
<CpBackground variant="horizon" />`,
  gridLayer: `<CpGridLayer pattern="dot" :opacity="0.6" />
<CpGridLayer pattern="line" :opacity="0.6" />
<CpGridLayer pattern="blueprint" :opacity="0.6" />`,
  hudStrip: `<CpHudStrip position="top" />
<CpHudStrip position="bottom" dense />`,
  floatingToolbar: `<CpFloatingToolbar position="right">
  <CpToolButton label="编辑">E</CpToolButton>
  <CpToolButton label="删除">D</CpToolButton>
</CpFloatingToolbar>`,
  tocPanel: `<CpTocPanel
  v-model="show"
  :chapters="['章节1', '章节2', '章节3']"
  :active-index="0"
  title="CONTENTS"
  @update:active-index="idx = $event"
/>`,
  sidebarComp: `<CyberSidebar header-text="USER_ID: GHOST">
  <div>插槽内容</div>
</CyberSidebar>`,
  navMenu: `<CyberNavMenu
  :items="[
    { text: '主页' },
    { text: '文章' },
    { text: '项目' },
    { text: '运行志', danger: true },
  ]"
  :active-index="0"
  @select="idx => {}"
/>`,
  blogCard: `<CyberBlogCard
  title="Neural Interface Protocol"
  description="探索人类大脑与数字世界的连接..."
/>
<CyberBlogCard
  title="Corrupted Data"
  status="corrupted"
/>
<CyberBlogCard
  title="Featured Post"
  status="featured"
/>`,
  filterBar: `<CyberFilterBar
  :filters="[
    { label: 'ALL', value: 'all' },
    { label: 'VUE', value: 'vue' },
  ]"
  v-model="activeFilter"
/>`,
  aboutModal: `<CyberAboutModal
  :visible="show"
  nickname="GHOST"
  id="USR_0x7F"
  role="管理员"
  :data-items="[
    { label: '文章', value: '42' },
    { label: '项目', value: '7' },
  ]"
  :tech-stack="['Vue', 'TypeScript', 'Rust']"
  :mission="['探索前端技术的无限可能']"
  :contacts="[
    { label: 'GitHub', url: '#', type: 'github' },
    { label: 'Email', url: '#', type: 'email' },
  ]"
  @close="show = false"
/>`,
  articleReader: `<CyberArticleReader
  :visible="show"
  :messages="messages"
  :loading="isLoading"
  :meta-items="[
    { label: '索引编号', value: 'ART_001' },
    { label: '档案标题', value: '第一次发文章' },
  ]"
  @close="show = false"
/>`,
  articleReaderSC: `<SterileCyberArticleReader
  :visible="show"
  :messages="messages"
  :loading="isLoading"
  :meta-items="metaItems"
  @close="show = false"
/>`,
  articleReaderSterile: `<SterileArticleReader
  :visible="show"
  :messages="messages"
  :loading="isLoading"
  :meta-items="metaItems"
  @close="show = false"
/>`,
  notFound: `<CyberNotFound
  code="404"
  title="页面未找到"
  description="抱歉，您访问的页面不存在或已被移除。"
/>`,
  notFound500: `<CyberNotFound
  code="500"
  title="系统故障"
  :glitch="true"
/>`,
  indexPanel: `<!-- 组合组件演示 -->
<section class="index-panel">
  <header>...</header>
  <CyberFilterBar :filters="filters" v-model="activeFilter" />
  <div class="grid">
    <CyberBlogCard v-for="item in cards" :key="item.title" ... />
  </div>
  <CyberPagination :current-page="page" :total-pages="total" />
</section>`,
  topnav: `<!-- TopNav 顶栏（无侧边栏布局） -->
<header class="topnav">
  <CpLogo text="CpUI" size="sm" />
  <nav>
    <a class="active">首页</a>
    <a>文章</a>
    <a>友链</a>
    <a>关于</a>
  </nav>
  <div class="right">
    <CpStatusLed status="online" :pulse="true" size="sm" />
  </div>
  <div class="bottom-line" />
</header>`,
  sidebar: `<!-- Sidebar 侧边栏 -->
<aside class="sidebar">
  <div class="sidebar-header">USER_ID: GHOST</div>
  <CyberProfileCard nickname="GHOST" level="42" />
  <CyberNavMenu :items="navItems" :active-index="0" />
  <CyberStatsGrid :stats="stats" />
  <CpDigitalClock :show-seconds="true" />
</aside>`,
}
</script>

<script lang="ts">
import { defineComponent, h } from 'vue'
const DocsTitle = defineComponent({
  props: { title: String, desc: String },
  setup(props) {
    return () => h('div', { class: 'docs__title-block' }, [
      h('h2', { class: 'docs__title' }, props.title),
      h('p', { class: 'docs__desc' }, props.desc),
    ])
  },
})
export default { name: 'App', components: { DocsTitle } }
</script>

<style lang="scss" scoped>
.docs {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    height: 48px;
    background: var(--cp-hud-bg);
    border-bottom: 1px solid var(--cp-hud-border);
    backdrop-filter: blur(12px);
    flex-shrink: 0;

    &-left, &-right { display: flex; align-items: center; gap: 8px; }
    &-sep { color: var(--cp-text-dim); font-size: 12px; }
    &-page { font-family: var(--cp-font-mono); font-size: 13px; color: var(--cp-text-secondary); }
  }
  &__link {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    font-family: var(--cp-font-mono);
    font-size: 11px;
    color: var(--cp-text-muted);
    text-decoration: none;
    border: 1px solid var(--cp-border-base);
    background: var(--cp-bg-base);
    transition: all 0.15s;
    &:hover {
      color: var(--cp-color-secondary);
      border-color: var(--cp-color-secondary);
      text-decoration: none;
    }
  }

  &__ctrl {
    background: var(--cp-bg-base);
    color: var(--cp-text-primary);
    border: 1px solid var(--cp-border-base);
    padding: 3px 8px;
    font-family: var(--cp-font-mono);
    font-size: 11px;
    cursor: pointer;
    outline: none;
    option { background: var(--cp-bg-panel); }
  }

  &__toggle {
    display: flex; align-items: center; gap: 4px;
    cursor: pointer; font-size: 11px; color: var(--cp-text-muted);
    input { display: none; }
  }

  &__layout {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  &__sidebar {
    width: 220px;
    flex-shrink: 0;
    background: rgba(0, 0, 0, 0.2);
    border-right: 1px solid var(--cp-border-dim);
    overflow-y: auto;
    padding: 12px 0;

    &::-webkit-scrollbar { width: 3px; }
    &::-webkit-scrollbar-thumb { background: var(--cp-border-base); }
  }

  &__nav-group {
    padding: 12px 20px 4px;
    font-family: var(--cp-font-mono);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--cp-text-dim);
  }

  &__nav-item {
    display: block;
    padding: 6px 20px 6px 28px;
    font-size: 13px;
    color: var(--cp-text-muted);
    cursor: pointer;
    transition: all 0.15s;

    &:hover { color: var(--cp-text-secondary); background: rgba(255,255,255,0.03); }

    &--active {
      color: var(--cp-color-secondary);
      background: rgba(0, 240, 255, 0.06);
      border-right: 2px solid var(--cp-color-secondary);
    }
  }

  &__content {
    flex: 1;
    overflow-y: auto;
    padding: 32px 40px 80px;
    max-width: 960px;

    &::-webkit-scrollbar { width: 4px; }
    &::-webkit-scrollbar-thumb { background: var(--cp-border-base); }
  }

  &__title-block { margin-bottom: 28px; }
  &__title {
    font-family: var(--cp-font-mono);
    font-size: 24px;
    font-weight: 700;
    color: var(--cp-text-primary);
    margin: 0 0 6px;
  }
  &__desc {
    font-size: 13px;
    color: var(--cp-text-dim);
    margin: 0;
    line-height: 1.6;
  }
}

/* ===== Index Demo ===== */
.index-demo {
  position: relative;
  width: 100%;
  padding: 2rem;
  background: rgba(5, 5, 10, 0.65);
  border: 1px solid rgba(0, 255, 247, 0.15);
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &__corner {
    position: absolute;
    width: 20px;
    height: 20px;
    pointer-events: none;
    &--tl { top: -1px; left: -1px; border-top: 2px solid var(--cp-color-secondary); border-left: 2px solid var(--cp-color-secondary); }
    &--tr { top: -1px; right: -1px; border-top: 2px solid var(--cp-color-secondary); border-right: 2px solid var(--cp-color-secondary); }
    &--bl { bottom: -1px; left: -1px; border-bottom: 2px solid var(--cp-color-secondary); border-left: 2px solid var(--cp-color-secondary); }
    &--br { bottom: -1px; right: -1px; border-bottom: 2px solid var(--cp-color-primary); border-right: 2px solid var(--cp-color-primary); }
  }

  &__header { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 1rem; }

  &__label { font-family: 'Share Tech Mono', monospace; color: var(--cp-color-secondary); letter-spacing: 0.2em; font-size: 0.8rem; margin: 0 0 0.5rem; }
  &__title { font-size: 2.2rem; color: #fff; margin: 0 0 0.5rem; text-transform: uppercase; font-family: 'Oswald', sans-serif; }
  &__desc { color: #aaa; line-height: 1.6; max-width: 420px; margin: 0; }

  &__search {
    display: flex;
    align-items: center;
    border: 1px solid rgba(0, 255, 247, 0.3);
    padding: 0.4rem 0.6rem;
    background: rgba(0, 0, 0, 0.35);
    min-width: 260px;
    align-self: flex-start;
  }
  &__search-input { flex: 1; border: none; background: transparent; color: #fff; font-size: 0.95rem; font-family: 'Share Tech Mono', monospace; outline: none; }
  &__search-clear { border: none; background: transparent; color: var(--cp-color-primary); font-size: 0.8rem; cursor: pointer; font-family: 'Share Tech Mono', monospace; }

  &__result { font-family: 'Share Tech Mono', monospace; color: #888; letter-spacing: 0.1em; font-size: 0.75rem; margin: 0; }

  &__grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }

  &__empty {
    border: 1px dashed rgba(255, 255, 255, 0.2);
    padding: 3rem 2rem;
    text-align: center;
    p { margin: 0; }
    p:first-child { font-size: 1.1rem; color: #fff; letter-spacing: 0.1em; font-family: 'Share Tech Mono', monospace; }
    p:last-child { color: #777; font-family: 'Share Tech Mono', monospace; font-size: 0.85rem; }
  }

  &__pagination { display: flex; justify-content: center; margin-top: 0.5rem; }
}

/* ===== TopNav V3 ===== */
.topnav-v3 {
  width: 100%;
  height: 48px;
  background: #0a0a0a;
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  gap: 2.5rem;
  position: relative;
  font-size: 14px;

  &__logo {
    font-family: 'Oswald', sans-serif;
    font-weight: 500;
    font-size: 1.1rem;
    color: #ddd;
    letter-spacing: 1px;
    cursor: pointer;
    flex-shrink: 0;
  }

  &__nav {
    display: flex;
    gap: 0;
  }

  &__link {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.75rem;
    color: #555;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 0 1rem;
    cursor: pointer;
    transition: color 0.15s;
    border-bottom: 2px solid transparent;

    &:hover { color: #aaa; }

    &--active {
      color: var(--cp-color-primary, #fce803);
      border-bottom-color: var(--cp-color-primary, #fce803);
    }
  }

  &__right {
    margin-left: auto;
    display: flex;
    align-items: center;
  }

  &__line {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(252, 232, 3, 0.15) 30%, rgba(252, 232, 3, 0.15) 70%, transparent);
  }
}

/* ===== Sidebar Demo ===== */
.sidebar-demo {
  width: 380px;
  background: rgba(20, 20, 25, 0.95);
  border-right: 4px solid var(--cp-color-primary);
  clip-path: polygon(0 0, 100% 0, 100% 98%, 95% 100%, 0 100%);
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 50;

  &__header {
    background: var(--cp-color-primary);
    color: #000;
    font-size: 0.7rem;
    font-family: 'Share Tech Mono', monospace;
    letter-spacing: 2px;
    text-align: center;
    padding: 0.4rem 0;
    font-weight: 800;
  }

  &__content {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__stats {
    margin-top: auto;
    border-top: 1px solid #333;
    padding-top: 1.5rem;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  &__copyright {
    font-size: 0.7rem;
    color: #555;
    font-family: 'Share Tech Mono', monospace;
  }
}

/* HeiXiaZi 原版终端演示 */
.heixiazi-demo {
  &__container {
    background: rgba(10, 10, 10, 0.95);
    border: 1px solid #333;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
    font-family: 'Share Tech Mono', monospace;
    display: flex;
    flex-direction: column;
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 16px;
    background: #1a1a1a;
    border-bottom: 1px solid #333;
    color: #888;
    font-size: 0.9rem;
    letter-spacing: 1px;
  }
  &__ctrls {
    display: flex;
    gap: 6px;
    color: #666;
    font-size: 12px;
    span { width: 20px; text-align: center; cursor: pointer; &:hover { color: #fff; } }
  }
  &__body {
    padding: 16px;
    height: 240px;
    overflow-y: auto;
    line-height: 1.6;
    font-size: 0.9rem;
    &::-webkit-scrollbar { width: 6px; }
    &::-webkit-scrollbar-track { background: #111; }
    &::-webkit-scrollbar-thumb { background: #333; }
  }
  &__cursor {
    color: #00ff00;
    animation: blink 1s step-end infinite;
    margin-top: 4px;
  }
  &__status {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    background: #111;
    border-top: 1px solid #333;
    font-size: 0.75rem;
    color: #666;
  }
  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #00ff00;
    animation: pulse-ring 2s infinite;
  }
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
@keyframes pulse-ring {
  0% { box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.4); }
  70% { box-shadow: 0 0 0 6px rgba(0, 255, 0, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 255, 0, 0); }
}

/* ===== Theme Showcase ===== */
.theme-card {
  border: 1px solid var(--cp-border-base, #222);
  border-radius: 2px;
  overflow: hidden;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    background: var(--cp-bg-elevated, #111);
    border-bottom: 1px solid var(--cp-border-base, #222);
  }

  &__name {
    font-family: 'Oswald', sans-serif;
    font-size: 0.9rem;
    color: var(--cp-text-secondary, #ccc);
    letter-spacing: 1px;
  }

  &__value {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.7rem;
    color: var(--cp-text-muted, #666);
  }

  &__body {
    padding: 16px;
    background: var(--cp-bg-base, #0a0e14);
  }
}

/* ===== Quickstart ===== */
.quickstart-install {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.quickstart-cmd {
  font-family: var(--cp-font-mono);
  font-size: 13px;
  color: var(--cp-text-primary);
  background: var(--cp-bg-elevated);
  padding: 8px 14px;
  border: 1px solid var(--cp-border-base);
  border-radius: var(--cp-radius-sm);
}
.quickstart-cmd-copy {
  font-family: var(--cp-font-mono);
  font-size: 11px;
  color: var(--cp-text-muted);
  background: var(--cp-bg-base);
  border: 1px solid var(--cp-border-base);
  padding: 6px 12px;
  cursor: pointer;
  transition: all 0.15s;
}
.quickstart-cmd-copy:hover {
  color: var(--cp-color-secondary);
  border-color: var(--cp-color-secondary);
}
.quickstart-preview {
  padding: 8px;
  background: var(--cp-bg-void);
  border: 1px dashed var(--cp-border-dim);
  margin-bottom: 12px;
}
.quickstart-links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.quickstart-link {
  text-decoration: none;
}

</style>
