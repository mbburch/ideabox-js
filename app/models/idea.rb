class Idea < ActiveRecord::Base
  before_validation :titleize

  validates :title, presence: true
  validates :body, presence: true

  enum quality: %w(Swill Plausible Genius)

  def titleize
    self.title = title.to_s.titleize
  end
end
