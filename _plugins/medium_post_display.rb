require 'feedjira'
module Jekyll
  class MediumPostDisplay < Generator
    safe true
    priority :high

    def getImage(content)
        img = nil
        begin
          img_start = content.index("<img ")
          if img_start
            img_end = content.index("\/\>",img_start)
            img_tag = content[img_start..img_end+2]
            
            #<img alt=\"\" src=\"https://cdn-images-1.medium.com/max/1024/0*u-fi2o-NsUJGo0_3\" />
            #img_tag = img_tag.gsub(/\\\\/,"-")
            img_tag = img_tag.gsub(/\"/, "")
            src_start = img_tag.index("src=")
            
            src_end = img_tag.index("\/\>",src_start)
            img = img_tag[src_start+4..src_end-2].strip
          end
        rescue Exception => e  
          p "#{e.message}"
          img = nil
        end
        return img
    end

    def generate(site)
          jekyll_coll = Jekyll::Collection.new(site, 'external_feed')
          site.collections['external_feed'] = jekyll_coll
            xml = HTTParty.get("https://medium.com/feed/singularitynet").body
            feed = Feedjira.parse(xml)
    	Feedjira.parse(xml).entries.each do |e|
    #Feedjira::Feed.fetch_and_parse("https://medium.com/feed/singularitynet").entries.each do |e|
            #p "Title: #{e.title}, published on Medium #{e.url} #{e}"
            title = e[:title]
            content = e[:content]
            guid = e[:url]
            path = "./_external_feed/" + title + ".md"
            path = site.in_source_dir(path)
            doc = Jekyll::Document.new(path, { :site => site, :collection => jekyll_coll })
            doc.data['title'] = title;
            img = getImage(content)
            doc.data['feed_image'] = img
            doc.data['feed_url'] = guid
            doc.data['pub_date'] = e[:pubDate]
            jekyll_coll.docs << doc
          end
        end
      end
    end
