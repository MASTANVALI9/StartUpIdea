import { render, screen } from '@testing-library/react'
import Home from '../page'

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /choose your career path/i,
    })

    expect(heading).toBeInTheDocument()
  })

  it('renders the search input', () => {
    render(<Home />)

    const searchInput = screen.getByPlaceholderText(/search careers, colleges, or courses/i)
    expect(searchInput).toBeInTheDocument()
  })

  it('renders feature cards', () => {
    render(<Home />)

    const exploreStreamsLink = screen.getByRole('link', {
      name: /explore career streams/i,
    })
    const salaryInsightsLink = screen.getByRole('link', {
      name: /view salary data/i,
    })

    expect(exploreStreamsLink).toBeInTheDocument()
    expect(salaryInsightsLink).toBeInTheDocument()
  })
})
