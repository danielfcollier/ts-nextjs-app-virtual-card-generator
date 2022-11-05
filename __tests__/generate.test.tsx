import { render, screen } from '@testing-library/react'

describe('Generate Page Elements', () => {
  it('renders a heading', () => {
    render(<h1>QR Code Image Generator</h1>)

    const heading = screen.getByRole('heading', {
      name: "QR Code Image Generator",
    })

    expect(heading).toBeInTheDocument()
  })
})
