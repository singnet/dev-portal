require 'feedjira'
module Jekyll
  class MediumPostDisplay < Generator
    safe true
    priority :high
def generate(site)
      jekyll_coll = Jekyll::Collection.new(site, 'external_feed')
      site.collections['external_feed'] = jekyll_coll
        xml = HTTParty.get("https://medium.com/feed/singularitynet").body
        feed = Feedjira.parse(xml)
	Feedjira.parse(xml).entries.each do |e|
#Feedjira::Feed.fetch_and_parse("https://medium.com/feed/singularitynet").entries.each do |e|
        p "Title: #{e.title}, published on Medium #{e.url} #{e}"
        title = e[:title]
        content = e[:content]
        guid = e[:url]
        path = "./_external_feed/" + title + ".md"
        path = site.in_source_dir(path)
        doc = Jekyll::Document.new(path, { :site => site, :collection => jekyll_coll })
        doc.data['title'] = title;
        doc.data['feed_content'] = content;
        doc.data['feed_url'] = guid;
        doc.data['pub_date'] = e[:pubDate]
        jekyll_coll.docs << doc
      end
    end
  end
end
