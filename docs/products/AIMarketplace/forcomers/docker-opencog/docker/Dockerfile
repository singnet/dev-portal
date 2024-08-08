FROM opencog/vqa

USER relex
RUN wget https://github.com/noskill/opencog-intro/archive/master.zip
RUN unzip master.zip
RUN rm master.zip
RUN chmod +x /home/relex/opencog-intro-master/notebook.sh
RUN cd /home/relex/projects && \
    mv semantic-vision-1 sem-vision && \
    git clone https://github.com/noskill/semantic-vision-1.git && \
    cd semantic-vision-1 && git checkout precomputed-images-demo
RUN cp -r /home/relex/projects/sem-vision/experiments/opencog/pattern_matcher_vqa/feature /home/relex/projects/semantic-vision-1/experiments/opencog/pattern_matcher_vqa/
RUN cp -r /home/relex/projects/sem-vision/experiments/opencog/question2atomese /home/relex/projects/semantic-vision-1/experiments/opencog/
RUN rm /home/relex/projects/semantic-vision-1/experiments/opencog/pattern_matcher_vqa/interface-images.ipynb
RUN rm -r /home/relex/projects/sem-vision/
RUN rm -rf /home/relex/miniconda3/pkgs
USER root
RUN apt-get clean
USER relex
