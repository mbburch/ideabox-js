require "rails_helper"

RSpec.describe "Ideas API", type: :request do

  let!(:idea1)  { Idea.create(title: "My First Idea", body: "This is my first idea") }
  let!(:idea2) { Idea.create(title: "My Second Idea", body: "This is my second idea", quality: 1) }
  let!(:idea3) { Idea.create(title: "My Third Idea", body: "This is my third idea", quality: 2) }

  context "ideas index" do
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

  context "new idea creation" do
    it "creates a new idea" do
      post "/api/v1/ideas", { idea: {title: "New Title",
                                    body: "New idea body."} }

      expect(response).to have_http_status(201)
      expect(Idea.all.count).to eq 4
      expect(Idea.last.title).to eq("New Title")
    end
  end

  context "deletes an idea" do
    it "can delete an idea" do
      expect(Idea.all.count).to eq 3

      delete "/api/v1/ideas/#{idea1.id}"

      expect(response).to have_http_status(204)
      expect(Idea.all.count).to eq 2
    end
  end
end