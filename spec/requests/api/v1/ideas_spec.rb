require "rails_helper"

RSpec.describe "Ideas API", type: :request do
  context "ideas index" do
    let!(:idea1)  { Idea.create(title: "My First Idea", body: "This is my first idea") }
    let!(:idea2) { Idea.create(title: "My Second Idea", body: "This is my second idea", quality: 1) }
    let!(:idea3) { Idea.create(title: "My Third Idea", body: "This is my third idea", quality: 2) }

    it "responds with 200 success" do
      get "/api/v1/ideas"

      expect(response).to be_success
      expect(response).to have_http_status(200)
    end

    it "shows all ideas" do
      get "/api/v1/ideas"

      json = JSON.parse(response.body)

      expect(json.length).to eq(3)
    end
  end
end