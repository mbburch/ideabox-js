class PublicController < ApplicationController
  def index
    @idea = Idea.new
  end
end