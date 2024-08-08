import React from 'react'
import { render, screen } from '@testing-library/react'
import Analytics from '../../app/components/Analytics'
describe('TESTING THE ANALYTICS COMPONENT', () => {
  it('should render a Line Chart analytics for views,bookmarks,likes for a specific article with the original article name as the label', () => {
    const nameOfArticleExample = 'Daniel goes to school'
    render(<
      Analytics
      articlename={nameOfArticleExample}
      viewsCount={2}
      BookmarkCount={2}
      CommentsCount={3}
      LikesCount={3}
    />);
    const header = screen.getByRole('heading');
    expect(header).toHaveTextContent(nameOfArticleExample);
  })
})
