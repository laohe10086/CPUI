// ===== Shared Data Types =====

export interface CategoryTab {
  label: string
  value: string
  count?: number
}

export interface StatItem {
  value: string | number
  label: string
  trend?: 'up' | 'down' | 'stable'
  trendValue?: string
  dynamic?: boolean
  highlight?: boolean
}

export interface TerminalEntry {
  message: string
  type?: 'info' | 'warning' | 'error' | 'success' | 'system'
  timestamp?: string
  source?: string
}

// ===== Triple-style Component Props =====

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  shape?: 'regular' | 'cut' | 'irregular'
  disabled?: boolean
  loading?: boolean
  block?: boolean
}

export interface CardProps {
  variant?: 'default' | 'outlined' | 'elevated'
  shape?: 'regular' | 'cut' | 'irregular'
  hoverable?: boolean
  bordered?: boolean
  title?: string
}

export interface InputProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  type?: string
  shape?: 'regular' | 'cut' | 'irregular'
}

export interface HeadingProps {
  underline?: boolean
  lineColor?: string
  textColor?: string
  glitched?: boolean
  neon?: boolean
  rgbSplit?: boolean
  linePulse?: boolean
  lineGlow?: boolean
}

export interface TagProps {
  variant?: 'default' | 'primary' | 'secondary' | 'danger' | 'success'
  size?: 'sm' | 'md'
  closable?: boolean
  clickable?: boolean
  shape?: 'regular' | 'cut' | 'irregular'
}

export interface BadgeProps {
  variant?: 'default' | 'primary' | 'secondary' | 'danger' | 'success'
  text?: string
  shape?: 'regular' | 'cut' | 'irregular'
}

export interface BracketLabelProps {
  text: string
  variant?: 'default' | 'accent' | 'muted' | 'danger'
}

export interface PanelProps {
  title?: string
  label?: string
  shape?: 'regular' | 'cut' | 'irregular'
}

export interface ModalProps {
  modelValue: boolean
  fullscreen?: boolean
  closeOnOverlay?: boolean
  closeOnEscape?: boolean
  hideClose?: boolean
  size?: 'sm' | 'md' | 'lg'
  shape?: 'regular' | 'cut' | 'irregular'
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
}

export interface AvatarProps {
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  scanline?: boolean
  id?: string
  status?: 'online' | 'offline' | 'warning' | 'error'
  statusPulse?: boolean
  fallbackIcon?: string
  shape?: 'regular' | 'cut' | 'irregular'
}

export interface ProgressBarProps {
  value: number
  variant?: 'default' | 'primary' | 'secondary' | 'danger'
  height?: number
  animated?: boolean
}

export interface CategoryTabsProps {
  tabs: CategoryTab[]
  modelValue: string
}

export interface StatsGridProps {
  stats: StatItem[]
}

export interface TerminalProps {
  title?: string
  entries?: TerminalEntry[]
  showStatus?: boolean
  statusState?: 'online' | 'offline' | 'warning' | 'error'
  statusText?: string
  memory?: string
  uptime?: string
}

export interface ChatBubbleProps {
  direction?: 'left' | 'right'
  variant?: 'default' | 'system' | 'accent'
  showAvatar?: boolean
  avatarSrc?: string
  avatarAlt?: string
  avatarScanline?: boolean
  avatarId?: string
  header?: string
  tag?: string
  timestamp?: string
  checksum?: string
}
