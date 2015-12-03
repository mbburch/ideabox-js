require 'rails_helper'

RSpec.feature "User visits page", type: :feature, js: true do

  scenario "and sees navbar information" do
    visit root_path

    within("nav") do
      expect(page).to have_content("Idea Box")
      expect(page).to have_css("#search")
    end
  end

  scenario "and sees all ideas" do
    idea1 = Idea.create!(title: "My First Idea", body: "This is my first idea")
    idea2 = Idea.create!(title: "My Second Idea", body: "This is my second idea", quality: 1)
    idea3 = Idea.create!(title: "My Third Idea", body: "This is my third idea", quality: 2)

    visit root_path

    expect(page).to have_css("#all-ideas")
    expect(Idea.count).to eq(3)
    expect(page).to have_content("My First Idea")
    expect(page).to have_content("My Second Idea")
    expect(page).to have_content("My Third Idea")
  end

  scenario "and searches for ideas" do
    idea1 = Idea.create!(title: "My First Idea", body: "This is my first idea")
    idea2 = Idea.create!(title: "My Second Idea", body: "This is my second idea", quality: 1)
    idea3 = Idea.create!(title: "My Third Idea", body: "This is my third idea", quality: 2)

    visit root_path

    expect(page).to have_content("My First Idea")
    expect(page).to have_content("My Second Idea")
    expect(page).to have_content("My Third Idea")
    expect(page).to have_css("#search")

    fill_in "search", with: "Firs"

    expect(page).to have_content("My First Idea")
    expect(page).to_not have_content("My Second Idea")
    expect(page).to_not have_content("My Third Idea")
  end
end