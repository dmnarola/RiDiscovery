import PropTypes from "prop-types";
import React, { useCallback, useEffect, useRef } from "react";

//Import Icons
import FeatherIcon from "feather-icons-react";

//Import images

// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import { Link, withRouter, useLocation } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";
import { isModulePermisssion } from "helpers/util";
import { ROLE_PERMISSIONS } from "constants/RolePermissions";

const SidebarContent = (props) => {
  const ref = useRef();
  const location = useLocation();
  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname;

    const initMenu = () => {
      new MetisMenu("#side-menu");
      let matchingMenuItem = null;
      const ul = document.getElementById("side-menu");
      const items = ul.getElementsByTagName("a");
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    initMenu();
  }, [props.location.pathname, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  });

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  return (
    <React.Fragment>
      <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
        <div id="sidebar-menu">
          {location?.pathname === '/register-company' ?
            <ul className="metismenu list-unstyled" id="side-menu">
              <li>
                <Link to="/register-company" className="">
                  <FeatherIcon icon="home" />
                  <span>{props.t("Company")}</span>
                </Link>
              </li>
            </ul>
            :
            <ul className="metismenu list-unstyled" id="side-menu">
              {isModulePermisssion(ROLE_PERMISSIONS?.MENU_DASHBOARD) && < li >
                <Link to="/dashboard" className="">
                  <FeatherIcon icon="home" />
                  <span>{props.t("Dashboard")}</span>
                </Link>
              </li>}
              {isModulePermisssion(ROLE_PERMISSIONS?.MENU_ASSESSMENT) && 
              <li>
                  <Link to="/applications" className="">
                  <FeatherIcon icon="grid" />
                  <span>{props.t("Assessment")}</span>
                </Link>
                </li>}

              <li>
                <Link to="/user-list" className="">
                  <FeatherIcon icon="users" />
                  <span>{props.t("Role Management")}</span>
                </Link>
              </li>

              <li>
                <Link to="/project-list" className="">
                  <FeatherIcon icon="file-text" />
                  <span>{props.t("Certificates")}</span>
                </Link>
              </li>

              <li>
                <Link to="/company" className="">
                  <FeatherIcon icon="home" />
                  <span>{props.t("Company")}</span>
                </Link>
              </li>

              <li>
                <Link to="/templates-list" className="">
                  <FeatherIcon icon="file" />
                  <span>{props.t("Templates")}</span>
                </Link>
              </li>
            </ul>
          }
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
