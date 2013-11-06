module ApplicationHelper
  def mark(text)
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML)#, :autolink => true, :space_after_headers => true)
    raw markdown.render text
  end
end
