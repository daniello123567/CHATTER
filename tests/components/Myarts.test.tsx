import React from "react";
import { render, screen } from '@testing-library/react'
import Myarts from "../../app/components/myarts";
import userEvent from '@testing-library/user-event'
describe('TESTING my articles component', () => {
  const funcToInvokeDelete = () => {
    document.querySelector('button')?.remove()
  }
  const idOfExampleArticle = '1234'
  const TitleOfExampleArticle = 'Daniel wants to know how to code like snr developer Mr setemi ojo'
  const DescriptionOfExampleArticle = 'Coding is fun. You just have to know javascript'
  const DateOfExampleArticle = 'Jul 1, 2023'
  const ThumbnailOfExampleArticle = '/example'
  const overallComponent = <Myarts
    onClick={funcToInvokeDelete}
    title={TitleOfExampleArticle}
    id={idOfExampleArticle}
    description={DescriptionOfExampleArticle}
    date={DateOfExampleArticle}
    thumbnail={ThumbnailOfExampleArticle}
  />



  it('should render all props well displaying infomation for a article that a user has written', () => {


    render(overallComponent);
    const image = screen.getByRole('img');
    const Links = screen.getAllByRole('link')
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', ThumbnailOfExampleArticle);
    expect(image).toHaveAttribute('alt', DescriptionOfExampleArticle);
    expect(screen.getByText(TitleOfExampleArticle)).toBeInTheDocument()
    expect(screen.getByText(DescriptionOfExampleArticle)).toBeInTheDocument()
    expect(screen.getByText(DateOfExampleArticle)).toBeInTheDocument()
    expect(Links[0]).toHaveAttribute('href', `/dashboard/analytics/${idOfExampleArticle}?title=${TitleOfExampleArticle}`)
    expect(Links[1]).toHaveAttribute('href', `/dashboard/new?edit=${idOfExampleArticle}`)
  })

})
