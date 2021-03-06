require 'rails_helper'

RSpec.describe Idea, type: :model do
  let!(:idea) { Idea.new(title: "First Idea", body: "This is my first idea.") }

  it "should be valid" do
    expect(idea).to be_valid
  end

  it "must have a title" do
    idea.title = nil
    expect(idea).to_not be_valid
  end

  it "must have a body" do
    idea.body = nil
    expect(idea).to_not be_valid
  end

  it "has a default quality of swill" do
    expect(idea.quality).to eq("swill")
  end

  it "can have a quality of plausible" do
    idea.quality = 1
    expect(idea.quality).to eq("plausible")
  end

  it "can have a quality of genius" do
    idea.quality = 2
    expect(idea.quality).to eq("genius")
  end
end