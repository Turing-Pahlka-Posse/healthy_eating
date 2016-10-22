require 'rails_helper'

RSpec.feature describe 'user clicks continue' do
  scenario 'user clicks continue and sees next part of story', js: true do
    visit root_path

    click_button('Continue')

    expect(page).to have_content('Everyone trades bits and pieces from their lunches.')
    expect(page).to_not have_content('You are on your way to the lunch room.')

    click_button('Continue')

    expect(page).to_not have_content('Everyone trades bits and pieces from their lunches.')
    expect(page).to_not have_content('You are on your way to the lunch room.')

    expect(page).to have_content('What kind of trades will you make?')

  end


end
