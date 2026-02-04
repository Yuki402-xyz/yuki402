import { render, screen } from '@testing-library/react'
import { PrimaryButton, SecondaryButton, OutlineButton, NavButton } from '../Button'

describe('Button Components', () => {
  describe('PrimaryButton', () => {
    it('renders with children text', () => {
      render(<PrimaryButton href='/test'>Click Me</PrimaryButton>)
      expect(screen.getByText('Click Me')).toBeInTheDocument()
    })

    it('renders as Link for internal routes', () => {
      render(<PrimaryButton href='/app'>Go to App</PrimaryButton>)
      const link = screen.getByText('Go to App').closest('a')
      expect(link).toHaveAttribute('href', '/app')
    })

    it('renders as anchor tag for external routes', () => {
      render(<PrimaryButton href='https://example.com'>External Link</PrimaryButton>)
      const link = screen.getByText('External Link').closest('a')
      expect(link).toHaveAttribute('href', 'https://example.com')
    })

    it('renders arrow icon by default', () => {
      const { container } = render(<PrimaryButton href='/test'>Button</PrimaryButton>)
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('does not render arrow icon when icon prop is false', () => {
      const { container } = render(
        <PrimaryButton href='/test' icon={false}>
          Button
        </PrimaryButton>
      )
      const svg = container.querySelector('svg')
      expect(svg).not.toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(
        <PrimaryButton href='/test' className='custom-class'>
          Button
        </PrimaryButton>
      )
      const link = screen.getByText('Button').closest('a')
      expect(link).toHaveClass('custom-class')
    })

    it('applies base classes', () => {
      render(<PrimaryButton href='/test'>Button</PrimaryButton>)
      const link = screen.getByText('Button').closest('a')
      expect(link).toHaveClass('group')
      expect(link).toHaveClass('flex')
      expect(link).toHaveClass('items-center')
    })
  })

  describe('SecondaryButton', () => {
    it('renders with children text', () => {
      render(<SecondaryButton href='/test'>Secondary</SecondaryButton>)
      expect(screen.getByText('Secondary')).toBeInTheDocument()
    })

    it('renders as anchor tag for internal routes with /', () => {
      render(<SecondaryButton href='/test'>Link</SecondaryButton>)
      const link = screen.getByText('Link').closest('a')
      expect(link).toHaveAttribute('href', '/test')
    })

    it('renders as anchor tag for hash links', () => {
      render(<SecondaryButton href='#features'>Features</SecondaryButton>)
      const link = screen.getByText('Features').closest('a')
      expect(link).toHaveAttribute('href', '#features')
    })

    it('renders as anchor tag for external routes', () => {
      render(<SecondaryButton href='https://example.com'>External</SecondaryButton>)
      const link = screen.getByText('External').closest('a')
      expect(link).toHaveAttribute('href', 'https://example.com')
    })

    it('does not render arrow icon by default', () => {
      const { container } = render(<SecondaryButton href='/test'>Button</SecondaryButton>)
      const svg = container.querySelector('svg')
      expect(svg).not.toBeInTheDocument()
    })

    it('renders arrow icon when icon prop is true', () => {
      const { container } = render(
        <SecondaryButton href='/test' icon>
          Button
        </SecondaryButton>
      )
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(
        <SecondaryButton href='/test' className='my-class'>
          Button
        </SecondaryButton>
      )
      const link = screen.getByText('Button').closest('a')
      expect(link).toHaveClass('my-class')
    })
  })

  describe('OutlineButton', () => {
    it('renders with children text', () => {
      render(<OutlineButton href='/test'>Outline</OutlineButton>)
      expect(screen.getByText('Outline')).toBeInTheDocument()
    })

    it('renders as Link for internal routes', () => {
      render(<OutlineButton href='/docs'>Documentation</OutlineButton>)
      const link = screen.getByText('Documentation').closest('a')
      expect(link).toHaveAttribute('href', '/docs')
    })

    it('renders as anchor tag with target="_blank" for external routes', () => {
      render(<OutlineButton href='https://example.com'>External</OutlineButton>)
      const link = screen.getByText('External').closest('a')
      expect(link).toHaveAttribute('href', 'https://example.com')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('renders arrow icon by default', () => {
      const { container } = render(<OutlineButton href='/test'>Button</OutlineButton>)
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('does not render arrow icon when icon prop is false', () => {
      const { container } = render(
        <OutlineButton href='/test' icon={false}>
          Button
        </OutlineButton>
      )
      const svg = container.querySelector('svg')
      expect(svg).not.toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(
        <OutlineButton href='/test' className='outline-custom'>
          Button
        </OutlineButton>
      )
      const link = screen.getByText('Button').closest('a')
      expect(link).toHaveClass('outline-custom')
    })
  })

  describe('NavButton', () => {
    it('renders with children text', () => {
      render(<NavButton href='/login'>Login</NavButton>)
      expect(screen.getByText('Login')).toBeInTheDocument()
    })

    it('renders as Link for internal routes', () => {
      render(<NavButton href='/login'>Login</NavButton>)
      const link = screen.getByText('Login').closest('a')
      expect(link).toHaveAttribute('href', '/login')
    })

    it('renders as anchor tag for external routes', () => {
      render(<NavButton href='https://example.com'>External</NavButton>)
      const link = screen.getByText('External').closest('a')
      expect(link).toHaveAttribute('href', 'https://example.com')
    })

    it('applies custom className', () => {
      render(
        <NavButton href='/test' className='nav-custom'>
          Button
        </NavButton>
      )
      const link = screen.getByText('Button').closest('a')
      expect(link).toHaveClass('nav-custom')
    })

    it('applies base classes', () => {
      render(<NavButton href='/test'>Button</NavButton>)
      const link = screen.getByText('Button').closest('a')
      expect(link).toHaveClass('bg-gradient-primary')
      expect(link).toHaveClass('font-semibold')
    })

    it('does not render arrow icon', () => {
      const { container } = render(<NavButton href='/test'>Button</NavButton>)
      const svg = container.querySelector('svg')
      expect(svg).not.toBeInTheDocument()
    })
  })
})
