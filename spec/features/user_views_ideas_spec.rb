require 'rails_helper'

RSpec.feature "User visits page" do

  scenario "and sees navbar information", js: :true do
    visit root_path

    within("nav") do
      expect(page).to have_content("Idea Box")
    end
  end

  scenario "and sees all ideas", js: :true do
    idea1 = Idea.create(title: "My First Idea", body: "This is my first idea")
    idea2 = Idea.create(title: "My Second Idea", body: "This is my second idea", quality: 1)
    idea3 = Idea.create(title: "My Third Idea", body: "This is my third idea", quality: 2)

    visit root_path

    expect(page).to have_css("#all-ideas")
    expect(Idea.count).to eq(3)
    expect(page).to have_content("My First Idea")
    expect(page).to have_content("My Second Idea")
    expect(page).to have_content("My Third Idea")
  end
end