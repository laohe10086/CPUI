// ===== Shared Types =====
export type {
  CategoryTab,
  StatItem,
  TerminalEntry,
  ButtonProps,
  CardProps,
  InputProps,
  TagProps,
  BadgeProps,
  BracketLabelProps,
  PanelProps,
  ModalProps,
  PaginationProps,
  AvatarProps,
  ProgressBarProps,
  CategoryTabsProps,
  StatsGridProps,
  TerminalProps,
  ChatBubbleProps,
  HeadingProps,
} from './types/components'

// ===== Theme =====
export { CpThemeProvider, useTheme, THEME_KEY } from './theme'
export type { ThemeContext } from './theme'

// ===== Cyber Components (16) =====
export { CyberButton } from './components/button'
export { CyberCard } from './components/card'
export { CyberInput } from './components/input'
export { CyberTag } from './components/tag'
export { CyberBadge } from './components/badge'
export { CyberBracketLabel } from './components/bracket-label'
export { CyberPanel } from './components/panel'
export { CyberModal } from './components/modal'
export { CyberPagination } from './components/pagination'
export { CyberAvatar } from './components/avatar'
export { CyberProgressBar } from './components/progress-bar'
export { CyberCategoryTabs } from './components/category-tabs'
export { CyberStatsGrid } from './components/stats-grid'
export { CyberTerminal } from './components/terminal'
export { CyberChatBubble } from './components/chat-bubble'
export { CyberHeading } from './components/heading'

// ===== SterileCyber Components (16) =====
export { SterileCyberButton } from './components/button'
export { SterileCyberCard } from './components/card'
export { SterileCyberInput } from './components/input'
export { SterileCyberTag } from './components/tag'
export { SterileCyberBadge } from './components/badge'
export { SterileCyberBracketLabel } from './components/bracket-label'
export { SterileCyberPanel } from './components/panel'
export { SterileCyberModal } from './components/modal'
export { SterileCyberPagination } from './components/pagination'
export { SterileCyberAvatar } from './components/avatar'
export { SterileCyberProgressBar } from './components/progress-bar'
export { SterileCyberCategoryTabs } from './components/category-tabs'
export { SterileCyberStatsGrid } from './components/stats-grid'
export { SterileCyberTerminal } from './components/terminal'
export { SterileCyberChatBubble } from './components/chat-bubble'
export { SterileCyberHeading } from './components/heading'

// ===== Sterile Components (16) =====
export { SterileButton } from './components/button'
export { SterileCard } from './components/card'
export { SterileInput } from './components/input'
export { SterileTag } from './components/tag'
export { SterileBadge } from './components/badge'
export { SterileBracketLabel } from './components/bracket-label'
export { SterilePanel } from './components/panel'
export { SterileModal } from './components/modal'
export { SterilePagination } from './components/pagination'
export { SterileAvatar } from './components/avatar'
export { SterileProgressBar } from './components/progress-bar'
export { SterileCategoryTabs } from './components/category-tabs'
export { SterileStatsGrid } from './components/stats-grid'
export { SterileTerminal } from './components/terminal'
export { SterileChatBubble } from './components/chat-bubble'
export { SterileHeading } from './components/heading'

// ===== Cyber-Only Components (10) =====
export { CyberGlitchText } from './components/glitch-text'
export { CyberDecipherText } from './components/decipher-text'
export { CyberScanLine } from './components/scan-line'
export { CyberCornerBrackets } from './components/corner-brackets'
export { CyberFrameDecor } from './components/frame-decor'
export { CyberLabelBar } from './components/label-bar'
export { CyberMonitorEye } from './components/monitor-eye'
export { CyberBootAnimation } from './components/boot-animation'
export { CyberDisconnect } from './components/disconnect'

// ===== Business Components (10) =====
export { CyberNavMenu } from './components/nav-menu'
export type { NavMenuItem } from './components/nav-menu'
export { CyberBlogCard } from './components/blog-card'
export { CyberProfileCard } from './components/profile-card'
export { CyberSidebar } from './components/sidebar'
export { CyberFilterBar } from './components/filter-bar'
export type { FilterItem } from './components/filter-bar'
export { CyberAboutModal } from './components/about-modal'
export type { AboutDataItem, AboutContactLink } from './components/about-modal'
export { CyberArticleReader, SterileCyberArticleReader, SterileArticleReader } from './components/article-reader'
export type { ArticleMessage, ArticleMetaItem } from './components/article-reader'
export { CyberNotFound } from './components/not-found'

// ===== Shared Components (11) =====
export { CpLogo, CpLogoTvOff, CpLogoNeon, CpLogoFlicker, CpLogoScanline, CpLogoDecipher } from './components/logo'
export { CpBackground } from './components/background'
export { CpGridLayer } from './components/grid-layer'
export { CpStatusLed } from './components/status-led'
export { CpDigitalClock } from './components/digital-clock'
export { CpTypingIndicator } from './components/typing-indicator'
export { CpHudStrip } from './components/hud-strip'
export { CpFloatingToolbar, CpToolButton } from './components/floating-toolbar'
export { CpTocPanel } from './components/toc-panel'

// ===== Vue Plugin — global registration =====
import type { App } from 'vue'
import { CpThemeProvider } from './theme'
import { CyberButton, SterileCyberButton, SterileButton } from './components/button'
import { CyberCard, SterileCyberCard, SterileCard } from './components/card'
import { CyberInput, SterileCyberInput, SterileInput } from './components/input'
import { CyberTag, SterileCyberTag, SterileTag } from './components/tag'
import { CyberBadge, SterileCyberBadge, SterileBadge } from './components/badge'
import { CyberBracketLabel, SterileCyberBracketLabel, SterileBracketLabel } from './components/bracket-label'
import { CyberPanel, SterileCyberPanel, SterilePanel } from './components/panel'
import { CyberModal, SterileCyberModal, SterileModal } from './components/modal'
import { CyberPagination, SterileCyberPagination, SterilePagination } from './components/pagination'
import { CyberAvatar, SterileCyberAvatar, SterileAvatar } from './components/avatar'
import { CyberProgressBar, SterileCyberProgressBar, SterileProgressBar } from './components/progress-bar'
import { CyberCategoryTabs, SterileCyberCategoryTabs, SterileCategoryTabs } from './components/category-tabs'
import { CyberStatsGrid, SterileCyberStatsGrid, SterileStatsGrid } from './components/stats-grid'
import { CyberTerminal, SterileCyberTerminal, SterileTerminal } from './components/terminal'
import { CyberChatBubble, SterileCyberChatBubble, SterileChatBubble } from './components/chat-bubble'
import { CyberHeading, SterileCyberHeading, SterileHeading } from './components/heading'
import { CyberGlitchText } from './components/glitch-text'
import { CyberDecipherText } from './components/decipher-text'
import { CyberScanLine } from './components/scan-line'
import { CyberCornerBrackets } from './components/corner-brackets'
import { CyberFrameDecor } from './components/frame-decor'
import { CyberLabelBar } from './components/label-bar'
import { CyberMonitorEye } from './components/monitor-eye'
import { CyberBootAnimation } from './components/boot-animation'
import { CyberDisconnect } from './components/disconnect'
import { CpLogo, CpLogoTvOff, CpLogoNeon, CpLogoFlicker, CpLogoScanline, CpLogoDecipher } from './components/logo'
import { CpBackground } from './components/background'
import { CpGridLayer } from './components/grid-layer'
import { CpStatusLed } from './components/status-led'
import { CpDigitalClock } from './components/digital-clock'
import { CpTypingIndicator } from './components/typing-indicator'
import { CpHudStrip } from './components/hud-strip'
import { CpFloatingToolbar, CpToolButton } from './components/floating-toolbar'
import { CpTocPanel } from './components/toc-panel'
import { CyberNavMenu } from './components/nav-menu'
import { CyberBlogCard } from './components/blog-card'

import { CyberProfileCard } from './components/profile-card'
import { CyberSidebar } from './components/sidebar'
import { CyberFilterBar } from './components/filter-bar'
import { CyberAboutModal } from './components/about-modal'
import { CyberArticleReader, SterileCyberArticleReader, SterileArticleReader } from './components/article-reader'
import { CyberNotFound } from './components/not-found'

const allComponents = {
  CpThemeProvider,
  CyberButton, SterileCyberButton, SterileButton,
  CyberCard, SterileCyberCard, SterileCard,
  CyberInput, SterileCyberInput, SterileInput,
  CyberTag, SterileCyberTag, SterileTag,
  CyberBadge, SterileCyberBadge, SterileBadge,
  CyberBracketLabel, SterileCyberBracketLabel, SterileBracketLabel,
  CyberPanel, SterileCyberPanel, SterilePanel,
  CyberModal, SterileCyberModal, SterileModal,
  CyberPagination, SterileCyberPagination, SterilePagination,
  CyberAvatar, SterileCyberAvatar, SterileAvatar,
  CyberProgressBar, SterileCyberProgressBar, SterileProgressBar,
  CyberCategoryTabs, SterileCyberCategoryTabs, SterileCategoryTabs,
  CyberStatsGrid, SterileCyberStatsGrid, SterileStatsGrid,
  CyberTerminal, SterileCyberTerminal, SterileTerminal,
  CyberChatBubble, SterileCyberChatBubble, SterileChatBubble,
  CyberHeading, SterileCyberHeading, SterileHeading,
  CyberGlitchText,
  CyberDecipherText,
  CyberScanLine,
  CyberCornerBrackets,
  CyberFrameDecor,
  CyberLabelBar,
  CyberMonitorEye,
  CyberBootAnimation,
  CyberDisconnect,
  CpLogo,
  CpLogoTvOff,
  CpLogoNeon,
  CpLogoFlicker,
  CpLogoScanline,
  CpLogoDecipher,
  CpBackground,
  CpGridLayer,
  CpStatusLed,
  CpDigitalClock,
  CpTypingIndicator,
  CpHudStrip,
  CpFloatingToolbar,
  CpToolButton,
  CpTocPanel,
  CyberNavMenu,
  CyberBlogCard,
  CyberProfileCard,
  CyberSidebar,
  CyberFilterBar,
  CyberAboutModal,
  CyberArticleReader,
  SterileCyberArticleReader,
  SterileArticleReader,
  CyberNotFound,
}

export default {
  install(app: App) {
    for (const [name, comp] of Object.entries(allComponents)) {
      app.component(name, comp)
    }
  },
}
