class Api::V1::IdeasController < ApplicationController
  respond_to :json

  def index
    respond_with Idea.all.order("created_at asc")
  end

  def create
    respond_with :api, :v1, Idea.create(idea_params)
  end

  def update
  end

  def destroy
    respond_with Idea.delete(params[:id])
  end

  private

  def idea_params
    params.require(:idea).permit(:title, :body, :quality)
  end
end