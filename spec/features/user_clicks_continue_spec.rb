require 'rails_helper'

RSpec.feature describe 'user clicks continue' do
  scenario 'user clicks continue and sees next part of story', js: true do
    visit root_path

    click_button('Continue')

    expect(page).to have_content('Everyone trades bits and pieces from their lunches.')
    expect(page).to_not have_content('You are on your way to the lunch room.')
  end
end
