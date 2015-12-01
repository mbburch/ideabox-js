class Seed
  def initialize
    generate_ideas
  end

  def generate_ideas
    10.times do
      idea = Idea.create(title: Faker::Hipster.word,
                  body: Faker::Hipster.sentence,
                  quality: [0, 1, 2].shuffle[rand])
      puts "Idea #{idea.id} created!"
    end
  end


end

Seed.new