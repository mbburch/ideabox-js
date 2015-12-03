require 'rails_helper'

RSpec.feature "User deletes idea", type: :feature, js: true do

  scenario "by clicking trash button" do
    idea1 = Idea.create!(title: "My First Idea", body: "This is my first idea")
    idea2 = Idea.create!(title: "My Second Idea", body: "This is my second idea", quality: 1)
    idea3 = Idea.create!(title: "My Third Idea", body: "This is my third idea", quality: 2)

    visit root_path

    expect(page).to have_css("#all-ideas")
    expect(Idea.count).to eq(3)

    first("#delete-idea").click

    expect(Idea.count).to eq(2)
  end
end