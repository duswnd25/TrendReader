import React from 'react';

class CardView extends React.Component {
    render() {
        let name = 'Name';
        let faviconSrc = 'favicon';
        let headerSrc = 'header';
        let title = 'title';
        let link = 'link';
        let summary = 'summary';
        let type = 'type';
        let date = 'date';

        return (
            <div class="wrapper">
                <div class="card radius shadowDepth1">
                    <!-- 헤더 이미지 -->
                    <div class="card__image border-tlr-radius">
                        <img src={headerSrc} alt="블로그 헤더 이미지" class="border-tlr-radius text-center"
                             style="background-color:white; height: 160px"/>
                    </div>

                    <div class="card__content card__padding">

                        <div class="card__meta">
                            <time class="article-date">{date}</time>
                        </div>

                        <article class="card__article">
                            <h2><a href={link}><strong>{title}</strong></a></h2>

                            <p>{summary}</p>
                        </article>
                    </div>

                    <div class="card__action">
                        <div class="card__author text-center">
                            <img src={faviconSrc} alt=" 블로그 Favicon">
                                <div class=" card__author-content">
                                    By {name} <span
                                    class=" info.type=== 'C' ? 'label label-primary' : ' label label-success'">{type}</span>
                                </div>
                            </img>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CardView;