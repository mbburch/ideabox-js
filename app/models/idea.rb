class Idea < ActiveRecord::Base
  before_validation :titleize

  validates :title, presence: true
  validates :body, presence: true

  enum quality: %w(swill plausible genius)

  def titleize
    self.title = title.to_s.titleize
  end
end
