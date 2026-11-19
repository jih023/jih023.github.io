source "https://rubygems.org"

# GitHub Pages가 실제로 쓰는 버전과 똑같이 맞춰요
gem "github-pages", group: :jekyll_plugins

group :jekyll_plugins do
  gem "jekyll-feed"
end

gem "webrick" # Ruby 3 이상에서 jekyll serve 할 때 필요

platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end
gem "wdm", "~> 0.1", :platforms => [:mingw, :x64_mingw, :mswin]
