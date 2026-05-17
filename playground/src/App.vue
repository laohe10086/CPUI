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

          <!-- ==================== 主题展示 ==================== -->

          <template v-if="activeItem === 'theme-showcase'">
            <DocsTitle title="五主题对比" desc="同一组件在 5 种主题下的视觉差异。每个区块独立包裹 CpThemeProvider，使用对应风格的组件。" />
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
                      <CyberBadge :value="42" />
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
                      <SterileCyberBadge :value="42" />
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
                      <CyberBadge :value="42" />
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
                      <SterileBadge :value="42" />
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
                      <SterileBadge :value="42" />
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
            <DemoBlock title="三风格对比">
              <div style="display:flex;gap:24px;align-items:flex-end">
                <div>
                  <div style="font-size:10px;color:var(--cp-color-primary);margin-bottom:6px">Cyber</div>
                  <div style="display:flex;gap:12px">
                    <CyberAvatar size="sm" id="SM" />
                    <CyberAvatar size="md" :scanline="true" id="MD" />
                    <CyberAvatar size="lg" :scanline="true" status="online" :status-pulse="true" />
                  </div>
                </div>
                <div>
                  <div style="font-size:10px;color:var(--cp-color-secondary);margin-bottom:6px">SC</div>
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
              </div>
              <template #code><DemoCode :code="codes.avatar" /></template>
            </DemoBlock>
          </template>

          <!-- StatsGrid -->
          <template v-if="activeItem === 'stats-grid'">
            <DocsTitle title="StatsGrid 数据面板" desc="角装饰 + 趋势箭头 + 数值脉冲 + 扫描线。" />
            <DemoBlock title="Cyber" description="角括号装饰 + 趋势箭头（绿/红）+ 高亮脉冲">
              <div style="max-width:420px">
                <CyberStatsGrid :stats="statsData" />
              </div>
              <template #code><DemoCode :code="codes.stats" /></template>
            </DemoBlock>
            <DemoBlock title="Cyber + 扫描线" description="叠加 CRT 扫描线纹理">
              <div style="max-width:420px">
                <CyberStatsGrid :stats="statsData" :scanline="true" />
              </div>
              <template #code><DemoCode :code="codes.statsScanline" /></template>
            </DemoBlock>
            <DemoBlock title="三风格对比">
              <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px">
                <div><div style="font-size:10px;color:var(--cp-color-primary);margin-bottom:6px">Cyber</div><CyberStatsGrid :stats="statsData" style="width:100%" /></div>
                <div><div style="font-size:10px;color:var(--cp-color-secondary);margin-bottom:6px">SC</div><SterileCyberStatsGrid :stats="statsData" style="width:100%" /></div>
                <div><div style="font-size:10px;color:var(--cp-text-muted);margin-bottom:6px">Sterile</div><SterileStatsGrid :stats="statsData" style="width:100%" /></div>
              </div>
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
            <DemoBlock title="三风格对比">
              <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px">
                <CyberTerminal title="SYSTEM.LOG" :entries="terminalEntries" status-state="online" status-text="ACTIVE" memory="2.1GB" uptime="14d" />
                <SterileCyberTerminal title="SC.LOG" :entries="terminalEntries" status-state="online" status-text="ACTIVE" memory="2.1GB" uptime="14d" />
                <SterileTerminal title="SYSTEM.LOG" :entries="terminalEntries" status-state="online" status-text="ACTIVE" memory="2.1GB" uptime="14d" />
              </div>
              <template #code><DemoCode :code="codes.terminal" /></template>
            </DemoBlock>
          </template>

          <!-- ChatBubble -->
          <template v-if="activeItem === 'chat-bubble'">
            <DocsTitle title="ChatBubble 聊天气泡" desc="对话气泡。Cyber 左上角有斜切。" />
            <DemoBlock title="三风格对比">
              <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px">
                <div>
                  <div style="font-size:10px;color:var(--cp-color-primary);margin-bottom:6px">Cyber</div>
                  <div style="display:flex;flex-direction:column;gap:8px">
                    <CyberChatBubble direction="left" variant="system" header="SYSTEM" tag="AUTO" timestamp="14:32:07">Neural link established.</CyberChatBubble>
                    <CyberChatBubble direction="right" header="USER" timestamp="14:32:10">Component scan.</CyberChatBubble>
                  </div>
                </div>
                <div>
                  <div style="font-size:10px;color:var(--cp-color-secondary);margin-bottom:6px">SC</div>
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
              </div>
              <template #code><DemoCode :code="codes.chat" /></template>
            </DemoBlock>
          </template>

          <!-- Panel -->
          <template v-if="activeItem === 'panel'">
            <DocsTitle title="Panel 面板" desc="带标题的内容容器。Cyber irregular 蜂窝四角斜切。" />
            <DemoBlock title="三风格对比">
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
              </div>
              <CyberPanel title="SYSTEM" label="monitor" shape="regular">
                <div style="display:flex;gap:8px"><CpStatusLed status="online" :pulse="true" /><span style="color:var(--cp-text-secondary);font-size:12px">API ONLINE</span></div>
              </CyberPanel>
              <template #code><DemoCode :code="codes.panel" /></template>
            </DemoBlock>
          </template>

          <!-- ==================== 导航 Navigation ==================== -->

          <!-- Pagination -->
          <template v-if="activeItem === 'pagination'">
            <DocsTitle title="Pagination 分页" desc="数据翻页。Cyber 提供规则 / 不规则两种形状。" />
            <DemoBlock title="Cyber 赛博朋克" description="梯形斜切 + 发光">
              <CyberPagination :current-page="currentPage" :total-pages="12" @update:current-page="currentPage = $event" />
              <template #code><DemoCode :code="codes.paginationCyber" /></template>
            </DemoBlock>
            <DemoBlock title="Cyber 赛博朋克（规则）" description="shape=regular 上下线框 + 发光">
              <CyberPagination shape="regular" :current-page="currentPage" :total-pages="12" @update:current-page="currentPage = $event" />
              <template #code><DemoCode :code="codes.paginationRegular" /></template>
            </DemoBlock>
            <DemoBlock title="SterileCyber / Sterile">
              <div style="display:flex;flex-direction:column;gap:20px">
                <div><div style="font-size:10px;color:var(--cp-color-secondary);margin-bottom:6px">SterileCyber</div><SterileCyberPagination :current-page="currentPage" :total-pages="12" @update:current-page="currentPage = $event" /></div>
                <div><div style="font-size:10px;color:var(--cp-text-muted);margin-bottom:6px">Sterile</div><SterilePagination :current-page="currentPage" :total-pages="12" @update:current-page="currentPage = $event" /></div>
              </div>
              <template #code><DemoCode :code="codes.paginationSC" /></template>
            </DemoBlock>
          </template>

          <!-- CategoryTabs -->
          <template v-if="activeItem === 'category-tabs'">
            <DocsTitle title="CategoryTabs 分类标签" desc="分类选择器。Cyber 提供规则 / 不规则两种形状。" />
            <DemoBlock title="Cyber 赛博朋克" description="平行四边形斜切 + 发光">
              <CyberCategoryTabs :tabs="catTabs" v-model="activeCat" />
              <template #code><DemoCode :code="codes.catTabsCyber" /></template>
            </DemoBlock>
            <DemoBlock title="Cyber 赛博朋克（规则）" description="shape=regular 上下线框 + 发光">
              <CyberCategoryTabs shape="regular" :tabs="catTabs" v-model="activeCat" />
              <template #code><DemoCode :code="codes.catTabsRegular" /></template>
            </DemoBlock>
            <DemoBlock title="SterileCyber / Sterile">
              <div style="display:flex;flex-direction:column;gap:20px">
                <div><div style="font-size:10px;color:var(--cp-color-secondary);margin-bottom:6px">SterileCyber</div><SterileCyberCategoryTabs :tabs="catTabs" v-model="activeCat" /></div>
                <div><div style="font-size:10px;color:var(--cp-text-muted);margin-bottom:6px">Sterile</div><SterileCategoryTabs :tabs="catTabs" v-model="activeCat" /></div>
              </div>
              <template #code><DemoCode :code="codes.catTabsSC" /></template>
            </DemoBlock>
          </template>

          <!-- ==================== 反馈 Feedback ==================== -->

          <!-- Modal -->
          <template v-if="activeItem === 'modal'">
            <DocsTitle title="Modal 弹窗" desc="对话框。Cyber 有大斜边 + 角落装饰。" />
            <DemoBlock title="三风格对比">
              <div style="display:flex;gap:12px">
                <CyberButton variant="primary" @click="showCyberModal = true">Cyber Modal</CyberButton>
                <SterileCyberButton variant="primary" @click="showSCModal = true">SC Modal</SterileCyberButton>
                <SterileButton variant="primary" @click="showSterileModal = true">Sterile Modal</SterileButton>
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
            <DocsTitle title="共享组件" desc="不区分风格的通用基础组件。" />
            <DemoBlock title="StatusLed / DigitalClock / TypingIndicator">
              <div style="display:flex;gap:24px;align-items:center;flex-wrap:wrap">
                <div style="display:flex;align-items:center;gap:6px"><CpStatusLed status="online" :pulse="true" /><span style="color:var(--cp-text-muted);font-size:12px">ONLINE</span></div>
                <div style="display:flex;align-items:center;gap:6px"><CpStatusLed status="warning" :pulse="true" /><span style="color:var(--cp-text-muted);font-size:12px">WARNING</span></div>
                <div style="display:flex;align-items:center;gap:6px"><CpStatusLed status="error" :pulse="true" /><span style="color:var(--cp-text-muted);font-size:12px">ERROR</span></div>
                <CpDigitalClock :show-seconds="true" :glitch="true" />
                <CpTypingIndicator />
              </div>
              <template #code><DemoCode :code="codes.shared" /></template>
            </DemoBlock>
          </template>

          <template v-if="activeItem === 'background'">
            <DocsTitle title="Background / GridLayer 背景层" desc="多风格背景 + 网格纹理叠加。" />
            <DemoBlock title="CpBackground" description="5 种变体：neon / mesh / glow / minimal / horizon">
              <div style="display:flex;gap:12px;flex-wrap:wrap">
                <div v-for="v in ['neon','mesh','glow','minimal','horizon']" :key="v" @click="bgVariant = v" :style="{padding:'6px 12px',cursor:'pointer',border:'1px solid',borderColor:bgVariant===v?'var(--cp-color-secondary)':'#333',color:bgVariant===v?'var(--cp-color-secondary)':'#888',fontSize:'0.75rem'}">{{ v }}</div>
              </div>
              <p style="color:var(--cp-text-muted);font-size:12px;margin-top:8px">背景已应用到整个页面，点击切换变体查看效果</p>
              <template #code><DemoCode :code="codes.background" /></template>
            </DemoBlock>
            <DemoBlock title="CpGridLayer" description="网格纹理：dot / line">
              <div style="display:flex;gap:12px">
                <div v-for="p in ['dot','line']" :key="p" @click="showGrid=true;gridPattern=p" :style="{padding:'6px 12px',cursor:'pointer',border:'1px solid #333',fontSize:'0.75rem',color:'#888'}">{{ p }}</div>
                <div @click="showGrid=false" :style="{padding:'6px 12px',cursor:'pointer',border:'1px solid #333',fontSize:'0.75rem',color:'#888'}">关闭</div>
              </div>
              <p style="color:var(--cp-text-muted);font-size:12px;margin-top:8px">网格已叠加到页面，点击切换图案</p>
              <template #code><DemoCode :code="codes.gridLayer" /></template>
            </DemoBlock>
          </template>

          <template v-if="activeItem === 'hud-strip'">
            <DocsTitle title="HudStrip 状态条" desc="顶部/底部 HUD 装饰条。" />
            <DemoBlock title="CpHudStrip" description="position: top / bottom, dense 紧凑模式">
              <div style="position:relative;height:80px;border:1px solid #333;overflow:hidden">
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
              <div style="position:relative;height:200px;border:1px solid #333">
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
  { value: 'sterile-dark', label: '无菌暗色' },
  { value: 'sterile-light', label: '无菌亮色' },
]
const bgVariant = ref<'mesh' | 'glow' | 'minimal' | 'neon'>('neon')
const showGrid = ref(true)
const gridPattern = ref<'dot' | 'line'>('line')
const showToc = ref(false)
const tocActive = ref(0)
const tocChapters = ['系统初始化', '连接协议', '数据同步', '安全审计', '日志归档']
const topNavActive = ref(0)
const topNavThemes = [
  { value: 'cyberpunk', label: '赛博朋克' },
  { value: 'sterile-cyber', label: '无菌赛博' },
  { value: 'sterile-light', label: '无菌亮色' },
]
const activeItem = ref('button')
const inputVal = ref('')
const showCyberModal = ref(false)
const showSCModal = ref(false)
const showSterileModal = ref(false)
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
    key: 'theme', label: '主题展示 Theme',
    items: [
      { key: 'theme-showcase', label: '五主题对比' },
    ],
  },
  {
    key: 'components', label: '组件 Components',
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
    key: 'cyber', label: '赛博专属 Cyber',
    items: [
      { key: 'glitch-text', label: 'GlitchText 故障文字' },
      { key: 'decipher-text', label: 'DecipherText 解码文字' },
      { key: 'cyber-decor', label: '装饰组件' },
      { key: 'disconnect', label: 'Disconnect 断开连接' },
      { key: 'boot-animation', label: 'BootAnimation 开机动画' },
    ],
  },
  {
    key: 'shared', label: '共享组件 Shared',
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
    key: 'business', label: '业务 Business',
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
    key: 'layout', label: '布局演示 Layout',
    items: [
      { key: 'index-panel', label: 'IndexPanel 索引面板' },
      { key: 'topnav', label: 'TopNav 顶栏' },
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
<CpGridLayer pattern="line" :opacity="0.6" />`,
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

</style>
