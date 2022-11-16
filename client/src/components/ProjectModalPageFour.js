import React, { useEffect, useState } from "react";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProjectModalPageFour = ({
  instagramExample,
  tiktokExample,
  youtubeExample,
  instagramTask,
  tiktokTask,
  youtubeTask,
  hashtags,
  tags,
  phrases,
  linkInBio,
}) => {
  // Page Four - Review Contract - Guideline Dropdowns
  const [showHashtags, setShowHashtags] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [showPhrases, setShowPhrases] = useState(false);
  const [showLinkInBio, setShowLinkInBio] = useState(false);

  useEffect(() => {
    console.log(instagramExample);
    console.log(youtubeExample);
    console.log(tiktokExample);
  }, []);

  return (
    <section className="project-modal-page">
      <h1 className="form__text form__text--subheader">Examples</h1>
      <div className="project-modal-examples-container">
        {youtubeTask ? (
          <div className="project-modal-example">
            <img
              src={youtubeExample}
              alt="youtube example"
              className="img-rounded"
            />
            <p>youtube</p>
            <p>{youtubeTask}</p>
          </div>
        ) : (
          ""
        )}
        {tiktokTask ? (
          <div className="project-modal-example">
            {" "}
            <img
              src={tiktokExample}
              alt="tiktok example"
              className="img-rounded"
            />
            <p>tiktok</p>
            <p>{tiktokTask}</p>
          </div>
        ) : (
          ""
        )}
        {instagramTask ? (
          <div className="project-modal-example">
            {" "}
            <img
              src={instagramExample}
              alt="instagram example"
              className="img-rounded"
            />
            <p>instagram</p>
            <p>{instagramTask}</p>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="project-modal-container">
        <h1 className="form__text form__text--subheader">Guidelines</h1>
        <div className="guidelines-card">
          <div className="guidelines-card__header">
            <p className="form__text form__text--subheader">Hashtags</p>
            <button
              type="button"
              className="guidelines-card__btn-expand"
              onClick={() => {
                setShowHashtags(!showHashtags);
              }}
            >
              {showHashtags ? (
                <>
                  <FontAwesomeIcon icon={faAngleUp} />
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faAngleDown} />
                </>
              )}
            </button>
          </div>
          {showHashtags ? (
            <div className="keywords-container keywords-container--guidelines">
              {hashtags.map((hashtag, index) => (
                <div className="keywords-item" key={index}>
                  <span className="keywords-text">{hashtag}</span>
                </div>
              ))}
            </div>
          ) : (
            " "
          )}
        </div>
        <div className="guidelines-card">
          <div className="guidelines-card__header">
            <p className="form__text form__text--subheader">Tags</p>
            <button
              type="button"
              className="guidelines-card__btn-expand"
              onClick={() => {
                setShowTags(!showTags);
              }}
            >
              {showTags ? (
                <>
                  <FontAwesomeIcon icon={faAngleUp} />
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faAngleDown} />
                </>
              )}
            </button>
          </div>
          {showTags ? (
            <div className="keywords-container keywords-container--guidelines">
              {tags.map((hashtag, index) => (
                <div className="keywords-item" key={index}>
                  <span className="keywords-text">{hashtag}</span>
                </div>
              ))}
            </div>
          ) : (
            " "
          )}
        </div>
        <div className="guidelines-card">
          <div className="guidelines-card__header">
            <p className="form__text form__text--subheader">Phrases</p>
            <button
              type="button"
              className="guidelines-card__btn-expand"
              onClick={() => {
                setShowPhrases(!showPhrases);
              }}
            >
              {showPhrases ? (
                <>
                  <FontAwesomeIcon icon={faAngleUp} />
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faAngleDown} />
                </>
              )}
            </button>
          </div>
          {showPhrases ? (
            <div className="keywords-container keywords-container--guidelines">
              {phrases.map((phrase, index) => (
                <div className="keywords-item" key={index}>
                  <span className="keywords-text">{phrase}</span>
                </div>
              ))}
            </div>
          ) : (
            " "
          )}
        </div>
        <div className="guidelines-card">
          <div className="guidelines-card__header">
            <p className="form__text form__text--subheader">Link In Bio</p>
            <button
              type="button"
              className="guidelines-card__btn-expand"
              onClick={() => {
                setShowLinkInBio(!showLinkInBio);
              }}
            >
              {showLinkInBio ? (
                <>
                  <FontAwesomeIcon icon={faAngleUp} />
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faAngleDown} />
                </>
              )}
            </button>
          </div>
          {showLinkInBio ? (
            <div className="keywords-container keywords-container--guidelines">
              <div className="keywords-item">
                <span className="keywords-text">{linkInBio}</span>
              </div>
            </div>
          ) : (
            " "
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectModalPageFour;
