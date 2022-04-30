'use strict';

/**
 *  page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
// devemos especificar os dados quie vamos enviar da api neste arquivo
module.exports = createCoreController("api::page.page", ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;
    const entity = await strapi.entityService.findMany("api::page.page", {
      ...query,
      populate: {
        menu: {
          populate: {
            logo: true,
            logo_text: true,
            image: true,
            menu_link: {
              populate: {
                link_text: true,
                url: true,
              },
            },
          },
        },
        sections:{
          populate: {
            title: true,
            content: true,
            description: true,
            image: true,
            text_grid: {
              populate: {
                title: true,
                description: true,
                metadata:{
                  populate:{
                    name: true,
                    section_id: true,
                    background: true
                  }
                },
              },
            },
            image_grid:{
              populate:{
                image: true,
              }
            },
            metadata:{
              populate:{
                name: true,
                section_id: true,
                background: true
              }
            }
          }
        }
      },
    });
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },
  async findOne(ctx) {
    const { id } = ctx.params;
    const entity = await strapi.entityService.findOne('api::page.page',id,
    {
      populate: {
        menu: {
          populate: {
            logo: true,
            logo_text: true,
            logo_link: true,
            open_in_new_tab: true,
            image: true,
            menu_link: {
              populate: {
                link_text: true,
                url: true,
              },
            },
          },
        },
        sections:{
          populate: {
            title: true,
            content: true,
            description: true,
            image: true,
            text_grid: {
              populate: {
                title: true,
                description: true,
                metadata:{
                  populate:{
                    name: true,
                    section_id: true,
                    background: true
                  }
                },
              },
            },
            image_grid:{
              populate:{
                image: true,
              }
            },
            metadata:{
              populate:{
                name: true,
                section_id: true,
                background: true
              }
            }
          }
        }
      },}
    );
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      console.log(strapi);
    return this.transformResponse(sanitizedEntity);
  }
}));
