require 'rails_helper'

RSpec.feature describe 'user visits homepage' do
  scenario 'user visits homepage and sees storyline and start button' do
    # As a user
    # When I visit the root path
    visit root_path
    # I should see the beginning of the story
    expect(page).to have_content('You are on the way to the lunch room')
    # and I should see a button that says "Start Game"
    expect(page).to have_button('Continue')
  end
end
