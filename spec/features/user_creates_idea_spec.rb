require 'rails_helper'

RSpec.feature "User creates idea", type: :feature, js: true do

  scenario "with valid attributes" do
    idea1 = Idea.create!(title: "My First Idea", body: "This is my first idea")
    idea2 = Idea.create!(title: "My Second Idea", body: "This is my second idea", quality: 1)
    idea3 = Idea.create!(title: "My Third Idea", body: "This is my third idea", quality: 2)

    visit root_path

    fill_in "title", with: "New Idea Title"
    fill_in "body", with: "New idea body."

    click_on "Create New Idea"

    expect(current_path).to eq(root_path)
    expect(page).to have_content("New Idea Title")
    expect(page).to have_content("New idea body.")
  end

  scenario "with invalid attributes" do
    idea1 = Idea.create!(title: "My First Idea", body: "This is my first idea")
    idea2 = Idea.create!(title: "My Second Idea", body: "This is my second idea", quality: 1)
    idea3 = Idea.create!(title: "My Third Idea", body: "This is my third idea", quality: 2)

    visit root_path

    fill_in "title", with: "New Idea Title"

    click_on "Create New Idea"

    expect(current_path).to eq(root_path)
    expect(page).to_not have_content("New Idea Title")
  end
end